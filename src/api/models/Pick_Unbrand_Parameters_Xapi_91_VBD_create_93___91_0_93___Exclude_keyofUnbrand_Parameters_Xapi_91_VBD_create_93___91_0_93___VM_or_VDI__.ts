/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_string_ } from './Record_string_string_';
import type { VBD_MODE } from './VBD_MODE';
import type { VBD_TYPE } from './VBD_TYPE';
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick_Unbrand_Parameters_Xapi_91_VBD_create_93___91_0_93___Exclude_keyofUnbrand_Parameters_Xapi_91_VBD_create_93___91_0_93___VM_or_VDI__ = {
    type?: VBD_TYPE;
    other_config?: Record_string_string_;
    mode?: VBD_MODE;
    qos_algorithm_params?: Record_string_string_;
    qos_algorithm_type?: string;
    bootable?: boolean;
    empty?: boolean;
    unpluggable?: boolean;
    userdevice?: string;
};

