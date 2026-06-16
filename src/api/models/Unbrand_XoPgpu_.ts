/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PGPU_DOM0_ACCESS } from './PGPU_DOM0_ACCESS';
export type Unbrand_XoPgpu_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    $host: string;
    $vgpus: Array<string>;
    dom0Access: PGPU_DOM0_ACCESS;
    enabledVgpuTypes: Array<string>;
    gpuGroup?: string;
    host: string;
    id: string;
    isSystemDisplayDevice: boolean;
    pci?: string;
    /**
     * @deprecated
     */
    supportedVgpuMaxCapcities?: string;
    supportedVgpuTypes: Array<string>;
    type: 'PGPU';
    vgpus: Array<string>;
};

