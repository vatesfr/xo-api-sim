/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HOST_POWER_STATE } from './HOST_POWER_STATE';
import type { Record_string_HOST_ALLOWED_OPERATIONS_ } from './Record_string_HOST_ALLOWED_OPERATIONS_';
import type { Record_string_string_ } from './Record_string_string_';
export type Unbrand_XoHost_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    $PBDs: Array<string>;
    $PCIs: Array<string>;
    $PGPUs: Array<string>;
    $PIFs: Array<string>;
    PCIs: Array<string>;
    PGPUs: Array<string>;
    PIFs: Array<string>;
    /**
     * @deprecated
     */
    CPUs: Record_string_string_;
    address: string;
    agentStartTime: number | null;
    bios_strings: Record_string_string_;
    build: string;
    certificates?: Array<{
        notAfter: number;
        fingerprint: string;
    }>;
    chipset_info: {
        iommu?: boolean;
    };
    controlDomain?: string;
    cpus: {
        sockets?: number;
        cores?: number;
    };
    current_operations: Record_string_HOST_ALLOWED_OPERATIONS_;
    enabled: boolean;
    hostname: string;
    hvmCapable: boolean;
    id: string;
    iscsiIqn: string;
    license_expiry: number | null;
    license_params: Record_string_string_;
    license_server: Record_string_string_;
    logging: Record_string_string_;
    memory: {
        usage: number;
        total?: number;
        size: number;
    };
    multipathing: boolean;
    name_description: string;
    name_label: string;
    otherConfig: Record_string_string_;
    /**
     * @deprecated
     */
    patches: Array<string>;
    power_state: HOST_POWER_STATE;
    powerOnMode: string;
    productBrand: string;
    rebootRequired: boolean;
    residentVms: Array<string>;
    startTime: number | null;
    supplementalPacks: ;
    tags: Array<string>;
    type: 'host';
    version: string;
    zstdSupported: boolean;
};

