import swagger from "../../swagger.json";

const COLLECTION_SCHEMA_MAP: Record<string, string> = {
  srs: "Partial_Unbrand_XoSr__",
  hosts: "Partial_Unbrand_XoHost__",
  pools: "Partial_Unbrand_XoPool__",
  networks: "Partial_Unbrand_XoNetwork__",
  vms: "Partial_Unbrand_XoVm__",
  "vm-templates": "Partial_Unbrand_XoVmTemplate__",
  "vm-snapshots": "Partial_Unbrand_XoVmSnapshot__",
  "vdi-snapshots": "Partial_Unbrand_XoVdiSnapshot__",
  "vm-controllers": "Partial_Unbrand_XoVmController__",
  vdis: "Partial_Unbrand_XoVdi__",
  vbds: "Partial_Unbrand_XoVbd__",
  pifs: "Partial_UnbrandedXoPif_",
  pbds: "Partial_Unbrand_XoPbd__",
  users: "Partial_Unbrand_XoUser__",
  groups: "Partial_Unbrand_XoGroup__",
  tasks: "Partial_Unbrand_XoTask__",
  messages: "Partial_Unbrand_XoMessage__",
  alarms: "Partial_Unbrand_XoAlarm__",
  proxies: "Partial_Unbrand_XoProxy__",
  servers: "Partial_Unbrand_XoServer__",
  schedules: "Partial_Unbrand_XoSchedule__",
  "backup-repositories": "Partial_Unbrand_XoBackupRepository__",
  "backup-logs": "Partial_Unbrand_XoBackupLog__",
  "backup-archives": "Partial_Unbrand_XoVmBackupArchive__",
  "acl-roles": "Partial_Unbrand_XoAclRole__",
  pcis: "Partial_Unbrand_XoPci__",
  pgpus: "Partial_Unbrand_XoPgpu__",
};

function resolveRef(ref: string): any {
  const parts = ref.replace("#/", "").split("/");
  let obj: any = swagger;
  for (const key of parts) {
    obj = obj[key];
    if (!obj) return undefined;
  }
  return obj;
}

function getDefaultValue(propSchema: any): any {
  if (propSchema.default !== undefined) {
    return propSchema.default;
  }

  if (propSchema.$ref) {
    const resolved = resolveRef(propSchema.$ref);
    if (resolved?.properties) {
      return computeDefaults(resolved);
    }
    if (resolved) {
      return getDefaultValue(resolved);
    }
    return {};
  }

  if (propSchema.properties) {
    return computeDefaults(propSchema);
  }

  switch (propSchema.type) {
    case "string":
      return "";
    case "number":
    case "integer":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return undefined;
  }
}

function computeDefaults(schema: any): Record<string, any> {
  const defaults: Record<string, any> = {};
  const props = schema.properties || {};
  for (const [key, propSchema] of Object.entries(props)) {
    const value = getDefaultValue(propSchema as any);
    if (value !== undefined) {
      defaults[key] = value;
    }
  }
  return defaults;
}

export function enrichFixtures(fixtures: Record<string, any[]>) {
  applySwaggerDefaults(fixtures);
}

function applySwaggerDefaults(fixtures: Record<string, any[]>) {
  const cache = new Map<string, Record<string, any>>();

  for (const [collectionName, schemaName] of Object.entries(
    COLLECTION_SCHEMA_MAP,
  )) {
    const items = fixtures[collectionName];
    if (!items) continue;

    let defaults = cache.get(schemaName);
    if (!defaults) {
      const schema = (swagger as any).components.schemas[schemaName];
      if (!schema) continue;
      defaults = computeDefaults(schema);
      cache.set(schemaName, defaults);
    }

    for (const item of items) {
      for (const [key, value] of Object.entries(defaults)) {
        if (item[key] === undefined) {
          item[key] = value;
        }
      }
    }
  }
}
