/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Omit_CreateVifParams_91_0_93__network_or_VM_or_other_config_or_qos_algorithm_params_ } from './Omit_CreateVifParams_91_0_93__network_or_VM_or_other_config_or_qos_algorithm_params_';
export type CreateVifBody = (Omit_CreateVifParams_91_0_93__network_or_VM_or_other_config_or_qos_algorithm_params_ & {
    MAC?: string;
} & {
    qos_algorithm_params?: Record<string, string>;
    other_config?: Record<string, string>;
    vmId: string;
    networkId: string;
});

