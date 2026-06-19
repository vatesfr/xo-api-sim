import type { Xapi } from "@vates/types";

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
} from "@vates/types";

type CreateVdiParams = Parameters<Xapi["VDI_create"]>;
export type CreateVdiBody = Omit<CreateVdiParams[0], "SR" | "other_config"> & {
  srId: string;
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
