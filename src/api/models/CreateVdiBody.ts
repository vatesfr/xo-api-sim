/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Omit_CreateVdiParams_91_0_93__SR_or_other_config_ } from './Omit_CreateVdiParams_91_0_93__SR_or_other_config_';
import type { Record_string_string_ } from './Record_string_string_';
export type CreateVdiBody = (Omit_CreateVdiParams_91_0_93__SR_or_other_config_ & {
    other_config?: Record<string, string>;
    srId: string;
} & {
    sm_config?: Record_string_string_;
});

