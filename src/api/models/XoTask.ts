/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Branded_task_ } from './Branded_task_';
import type { Record_string_string_ } from './Record_string_string_';
import type { Record_string_unknown_ } from './Record_string_unknown_';
export type XoTask = {
    warnings?: Array<{
        message: string;
        data: any;
    }>;
    updatedAt?: number;
    tasks?: Array<XoTask>;
    status: 'failure' | 'interrupted' | 'pending' | 'success';
    start: number;
    result?: Record_string_unknown_;
    properties: Record<string, any>;
    progress?: number;
    infos?: Array<{
        message: string;
        data: any;
    }>;
    id: Branded_task_;
    end?: number;
    data?: Record_string_string_;
    abortionRequestedAt?: number;
};

