/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_STORAGE_OPERATIONS_ } from './Record_string_STORAGE_OPERATIONS_';
import type { Record_string_string_ } from './Record_string_string_';
export type Unbrand_XoSr_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    $PBDs: Array<string>;
    $container: string;
    VDIs: Array<string>;
    allocationStrategy?: 'unknown' | 'thin' | 'thick';
    content_type: string;
    current_operations: Record_string_STORAGE_OPERATIONS_;
    id: string;
    inMaintenanceMode: boolean;
    name_description: string;
    name_label: string;
    other_config: Record_string_string_;
    physical_usage: number;
    shared: boolean;
    size: number;
    sm_config: Record_string_string_;
    SR_type: string;
    tags: Array<string>;
    type: 'SR';
    usage: number;
};

