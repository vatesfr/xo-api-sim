import type { Xapi, XoHost, XoVmTemplate, Branded } from "@vates/types";

export type {
  Branded,
  HOST_POWER_STATE,
  VM_POWER_STATE,
  XoAlarm,
  XoAuthenticationToken,
  XoGpuGroup,
  XoGroup,
  XoHost,
  XoMessage,
  XoNetwork,
  XoPbd,
  XoPci,
  XoPgpu,
  XoPif,
  XoPool,
  XoProxy,
  XoSchedule,
  XoServer,
  XoSr,
  XoTask,
  XoUser,
  XoVbd,
  XoVdi,
  XoVdiSnapshot,
  XoVif,
  XoVm,
  XoVmController,
  XoVmSnapshot,
  XoVmTemplate,
  VDI_TYPE,
} from "@vates/types";

type CreateVdiParams = Parameters<Xapi["VDI_create"]>;
export type CreateVdiBody = Omit<CreateVdiParams[0], "SR" | "other_config"> & {
  srId: Branded<"SR">;
  other_config?: { [key: string]: string };
} & CreateVdiParams[1];

// VIF types
export interface CreateVifParams {
  device: string;
  network: string;
  VM: string;
  MAC?: string;
  MTU?: number;
  other_config?: Record<string, string>;
}

export type CreateVifBody = CreateVifParams;

// VBD types (mirrored from @xen-orchestra/rest-api/src/vbds/vbd.controller.mts)
export type CreateVbdBody = {
  VM: Branded<"VM">;
  VDI: Branded<"VDI">;
  bootable?: boolean;
  mode?: "RW" | "RO";
  empty?: boolean;
  type?: "System" | "User" | "CD" | "DVD" | "Other";
  other_config?: Record<string, string>;
  qos_algorithm_type?: string;
  qos_algorithm_id?: string;
  MTU?: number;
};

// VM types (mirrored from @xen-orchestra/rest-api/src/pools/pool.type.mts)
type CreateVmParams = Parameters<Xapi["createVm"]>[1];

type CreateVmAfterCreateParams = {
  cloud_config?: string;
  network_config?: string;
  boot?: boolean;
  destroy_cloud_config_vdi?: boolean;
  createVtpm?: boolean;
};

export type CreateVmBody = Omit<
  CreateVmParams,
  "nameLabel" | "existingVdis" | "vdis" | "affinityHost" | "installRepository"
> & {
  template: XoVmTemplate["uuid"];
  affinity?: XoHost["id"];
  vdis?: (
    | {
        name_label: string;
        size: number;
        sr?: string;
        name_description?: string;
      }
    | {
        userdevice: string;
        name_label?: string;
        size?: number;
        sr?: string;
        name_description?: string;
      }
    | {
        destroy: true;
        userdervice: string;
      }
  )[];
  install?:
    | {
        method: "cdrom";
        repository: string;
      }
    | {
        method: "network";
        repository: "";
      };
} & CreateVmAfterCreateParams;
