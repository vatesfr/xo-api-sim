/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_POOL_ALLOWED_OPERATIONS_ } from './Record_string_POOL_ALLOWED_OPERATIONS_';
import type { Record_string_string_ } from './Record_string_string_';
export type Unbrand_XoPool_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    auto_poweron: boolean;
    cpus: {
        sockets?: number;
        cores?: number;
    };
    crashDumpSr?: string;
    current_operations: Record_string_POOL_ALLOWED_OPERATIONS_;
    default_SR?: string;
    HA_enabled: boolean;
    haSrs: Array<string>;
    id: string;
    master: string;
    migrationCompression?: boolean;
    name_description: string;
    name_label: string;
    otherConfig: Record_string_string_;
    platform_version: string;
    suspendSr?: string;
    tags: Array<string>;
    type: 'pool';
    vtpmSupported: boolean;
    zstdSupported: boolean;
};

