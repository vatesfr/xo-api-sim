/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Make all properties in T optional
 */
export type Partial_UnbrandedXoAlarm_ = {
    $pool?: string;
    /**
     * @deprecated
     */
    $poolId?: string;
    _xapiRef?: string;
    uuid?: string;
    id?: string;
    type?: 'message';
    name?: string;
    time?: number;
    body?: {
        name: string;
        value?: string;
    };
    object?: {
        href?: string;
        uuid: string;
        type: 'pool' | 'VBD' | 'host' | 'VIF' | 'VTPM' | 'VM-snapshot' | 'SR' | 'VM' | 'message' | 'vgpu' | 'gpuGroup' | 'network' | 'PBD' | 'PCI' | 'PGPU' | 'PIF' | 'VDI' | 'VDI-snapshot' | 'VDI-unmanaged' | 'vgpuType' | 'VM-controller' | 'VM-template' | 'SM' | 'unknown';
    };
};

