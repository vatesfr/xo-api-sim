/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_unknown_ } from './Record_string_unknown_';
/**
 * Make all properties in T optional
 */
export type Partial_Unbrand_XoBackupRepository__ = {
    benchmarks?: Array<{
        writeRate: number;
        timestamp: number;
        readRate: number;
    }>;
    enabled?: boolean;
    error?: Record_string_unknown_;
    id?: string;
    name?: string;
    options?: string;
    proxy?: string;
    url?: string;
};

