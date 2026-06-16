/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_string_ } from './Record_string_string_';
export type Unbrand_XoPbd_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    attached: boolean;
    device_config: (Record_string_string_ | {
        device: string;
    } | {
        location: string;
    } | {
        legacy_mode: string;
        location: string;
        path: string;
    } | {
        'group-name': string;
        redundancy: string;
        provisioning: string;
    } | {
        serverpath: string;
        server: string;
    } | {
        location: string;
        type: string;
    });
    host: string;
    id: string;
    otherConfig: Record_string_string_;
    SR: string;
    type: 'PBD';
};

