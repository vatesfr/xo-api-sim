/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_attaching_ } from './Record_string_attaching_';
import type { Record_string_string_ } from './Record_string_string_';
export type Unbrand_XoNetwork_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    MTU: number;
    PIFs: Array<string>;
    VIFs: Array<string>;
    automatic: boolean;
    bridge: string;
    current_operations: Record_string_attaching_;
    defaultIsLocked: boolean;
    id: string;
    insecureNbd?: boolean;
    isBonded: boolean;
    name_description: string;
    name_label: string;
    nbd?: boolean;
    other_config: Record_string_string_;
    tags: Array<string>;
    type: 'network';
};

