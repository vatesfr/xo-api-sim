/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_string_ } from './Record_string_string_';
import type { VIF_LOCKING_MODE } from './VIF_LOCKING_MODE';
export type Unbrand_XoVif_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    $VM: string;
    $network: string;
    allowedIpv4Addresses: Array<string>;
    allowedIpv6Addresses: Array<string>;
    attached: boolean;
    device: string;
    id: string;
    lockingMode: VIF_LOCKING_MODE;
    MAC: string;
    MTU: number;
    other_config: Record_string_string_;
    /**
     * In kB/s
     */
    rateLimit?: number;
    txChecksumming: boolean;
    type: 'VIF';
};

