/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_string_ } from './Record_string_string_';
import type { Record_string_VDI_OPERATIONS_ } from './Record_string_VDI_OPERATIONS_';
import type { VDI_TYPE } from './VDI_TYPE';
export type Unbrand_XoVdiSnapshot_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    $SR: string;
    $VBDs: Array<string>;
    VDI_type: VDI_TYPE;
    cbt_enabled?: boolean;
    current_operations: Record_string_VDI_OPERATIONS_;
    missing: boolean;
    name_description: string;
    name_label: string;
    other_config: Record_string_string_;
    parent?: string;
    image_format?: string;
    size: number;
    snapshots: Array<string>;
    tags: Array<string>;
    usage: number;
    id: string;
    snapshot_time: number;
    $snapshot_of?: string;
    type: 'VDI-snapshot';
};

