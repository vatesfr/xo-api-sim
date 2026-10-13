import type express from "express";
import type { MockDataStore } from "../data-store";
import type { XoVbd, XoVdi, XoVmTemplate } from "../types";
import { createRandomRawStream } from "./vdis";

// Keep mock exports small, whatever the size of the template's disks.
const MAX_EXPORT_SIZE = 4 * 1024 * 1024;

export function registerVmTemplateHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.get("/rest/v0/vm-templates/:id.:format", (req, res) =>
    exportVmTemplate(req, res, dataStore),
  );
  app.delete("/rest/v0/vm-templates/:id", (req, res) =>
    deleteVmTemplate(req, res, dataStore),
  );
}

function findTemplate(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
): XoVmTemplate | undefined {
  const { id } = req.params;
  const tpl = dataStore.findById("vm-templates", id) as
    | XoVmTemplate
    | undefined;
  if (!tpl) {
    res.status(404).json({
      error: `no such VM-template ${id}`,
      data: { id, type: "VM-template" },
    });
  }
  return tpl;
}

// Mirrors `VmService.export` and the `vmExportCompressDeprecated` middleware:
// https://github.com/vatesfr/xen-orchestra/blob/master/%40xen-orchestra/rest-api/src/vm-templates/vm-template.controller.mts
function exportVmTemplate(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const tpl = findTemplate(req, res, dataStore);
  if (!tpl) return;

  const { id, format } = req.params;
  if (format !== "xva" && format !== "ova") {
    return res.status(422).json({
      error: `invalid format '${format}' (must be xva or ova)`,
      data: { id, type: "VM-template" },
    });
  }

  // The mock export is never compressed, so `compress` is only validated.
  if (!isValidCompress(req.query.compress)) {
    return res.status(422).json({
      error: `invalid compress '${req.query.compress}' (must be true, false, gzip or zstd)`,
      data: { id, type: "VM-template" },
    });
  }

  const diskSize = tpl.$VBDs.reduce((total, vbdId) => {
    const vbd = dataStore.findById("vbds", vbdId) as XoVbd | undefined;
    const vdi = vbd?.VDI
      ? (dataStore.findById("vdis", vbd.VDI) as XoVdi | undefined)
      : undefined;
    return total + (Number(vdi?.size) || 0);
  }, 0);
  const size = Math.min(diskSize || 1024 * 1024, MAX_EXPORT_SIZE);

  res.status(200).contentType("application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename=${id}.${format}`);
  res.setHeader("Content-Length", String(size));
  createRandomRawStream(size).pipe(res);
}

// `true`/`false` are deprecated aliases kept by `vmExportCompressDeprecated`.
function isValidCompress(value: unknown) {
  return (
    value === undefined ||
    ["true", "false", "gzip", "zstd"].includes(value as string)
  );
}

// Mirrors `Xapi.VM_destroy` without `force`: default templates and templates
// with a blocked destroy operation can't be deleted, disks are deleted too.
// https://github.com/vatesfr/xen-orchestra/blob/master/%40xen-orchestra/xapi/vm.mjs
function deleteVmTemplate(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const tpl = findTemplate(req, res, dataStore);
  if (!tpl) return;

  const { id } = req.params;
  if (tpl.isDefaultTemplate) {
    return res.status(409).json({
      error: "incorrect state: isDefaultTemplate is true, expected false",
      data: { id, type: "VM-template" },
    });
  }

  if (tpl.blockedOperations?.destroy !== undefined) {
    return res.status(403).json({
      error: "forbidden operation: destroy is blocked",
      data: { id, type: "VM-template" },
    });
  }

  // Like `VM_getDisks`: keep CD media and VDIs still attached to another VM.
  for (const vbdId of tpl.$VBDs) {
    const vbd = dataStore.deleteItem("vbds", vbdId) as XoVbd | null;
    if (
      vbd?.VDI &&
      !vbd.is_cd_drive &&
      !dataStore
        .getResource("vbds")
        .some((other: XoVbd) => other.VDI === vbd.VDI)
    ) {
      dataStore.deleteItem("vdis", vbd.VDI);
    }
  }
  dataStore.deleteItem("vm-templates", id);

  res.status(204).send();
}
