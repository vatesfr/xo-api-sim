/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_number_ } from './Record_string_number_';
import type { Record_string_string_ } from './Record_string_string_';
export type Unbrand_XoSm_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    id: string;
    SM_type: string;
    vendor: string;
    name_label: string;
    name_description: string;
    configuration: Record_string_string_;
    features: Record_string_number_;
    driver_filename: string;
    required_cluster_stack: Array<string>;
    supported_image_formats: Array<string>;
    type: 'SM';
};

