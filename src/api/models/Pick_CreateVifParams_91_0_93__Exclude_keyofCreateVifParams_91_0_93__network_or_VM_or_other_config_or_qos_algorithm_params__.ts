/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VIF_LOCKING_MODE } from './VIF_LOCKING_MODE';
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick_CreateVifParams_91_0_93__Exclude_keyofCreateVifParams_91_0_93__network_or_VM_or_other_config_or_qos_algorithm_params__ = {
    device?: string;
    MTU?: number;
    currently_attached?: boolean;
    ipv4_allowed?: Array<string>;
    ipv6_allowed?: Array<string>;
    locking_mode?: VIF_LOCKING_MODE;
    qos_algorithm_type?: string;
};

