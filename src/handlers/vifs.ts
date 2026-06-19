import type express from "express";
import { v4 as uuid } from "uuid";
import type { MockDataStore } from "../data-store";
import type { CreateVifBody } from "../types";

export function registerVifHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/vifs", (req, res) => createVif(req, res, dataStore));
}

function createVif(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const body = req.body as CreateVifBody;

  // Validate required fields
  if (!body.device) {
    return res.status(400).json({
      error: "device is required",
      data: { id: null, type: "VIF" },
    });
  }

  if (!body.network) {
    return res.status(400).json({
      error: "network is required",
      data: { id: null, type: "VIF" },
    });
  }

  if (!body.VM) {
    return res.status(400).json({
      error: "VM is required",
      data: { id: null, type: "VIF" },
    });
  }

  // Validate referenced network exists
  const network = dataStore.findById("networks", body.network);
  if (!network) {
    return res.status(404).json({
      error: `no such network ${body.network}`,
      data: { id: body.network, type: "NETWORK" },
    });
  }

  // Validate referenced VM exists
  const vm = dataStore.findById("vms", body.VM);
  if (!vm) {
    return res.status(404).json({
      error: `no such VM ${body.VM}`,
      data: { id: body.VM, type: "VM" },
    });
  }

  // Generate MAC address if not provided
  const mac = body.MAC || generateMacAddress();

  // Build the stored object
  const id = uuid();
  const vif = {
    id,
    uuid: id,
    type: "VIF" as const,
    name_label: `VIF ${id}`,
    name_description: "",
    $pool: vm.$poolId,
    $poolId: vm.$poolId,
    $VBDs: [],
    $VM: vm.id,
    MAC: mac,
    device: body.device,
    MTU: body.MTU || 1500,
    currently_attached: false,
    status: "active",
    status_detail: "",
    qos_algorithm_type: "",
    qos_algorithm_params: {},
    locked: false,
    network: body.network,
    VM: body.VM,
    ...(body.other_config ? { other_config: body.other_config } : {}),
  };

  dataStore.addItem("vifs", vif);
  res.status(201).json({ id });
}

function generateMacAddress(): string {
  return `00:16:3e:${Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")}:${Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")}:${Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")}`;
}
