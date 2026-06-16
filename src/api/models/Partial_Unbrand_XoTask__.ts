/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_string_ } from './Record_string_string_';
import type { Record_string_unknown_ } from './Record_string_unknown_';
import type { XoTask } from './XoTask';
/**
 * Make all properties in T optional
 */
export type Partial_Unbrand_XoTask__ = {
    abortionRequestedAt?: number;
    data?: Record_string_string_;
    end?: number;
    id?: string;
    infos?: Array<{
        message: string;
        data: any;
    }>;
    progress?: number;
    properties?: Record<string, any>;
    result?: Record_string_unknown_;
    start?: number;
    status?: 'failure' | 'interrupted' | 'pending' | 'success';
    tasks?: Array<XoTask>;
    updatedAt?: number;
    warnings?: Array<{
        message: string;
        data: any;
    }>;
};

