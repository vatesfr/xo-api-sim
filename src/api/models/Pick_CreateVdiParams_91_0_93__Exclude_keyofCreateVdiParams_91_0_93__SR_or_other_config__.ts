/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_string_ } from './Record_string_string_';
import type { VDI_TYPE } from './VDI_TYPE';
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick_CreateVdiParams_91_0_93__Exclude_keyofCreateVdiParams_91_0_93__SR_or_other_config__ = {
    name_description?: string;
    name_label?: string;
    tags?: Array<string>;
    type?: VDI_TYPE;
    read_only?: boolean;
    sharable?: boolean;
    virtual_size: number;
    xenstore_data?: Record_string_string_;
};

