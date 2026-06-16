/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_StatValues_ } from './Record_string_StatValues_';
import type { StatValues } from './StatValues';
export type XapiHostStatsRaw = {
    pifs?: {
        tx: Record_string_StatValues_;
        rx: Record_string_StatValues_;
    };
    memoryFree?: StatValues;
    memory?: StatValues;
    load?: StatValues;
    latency?: {
        'w': Record_string_StatValues_;
        'r': Record_string_StatValues_;
    };
    iowait?: Record_string_StatValues_;
    iops?: {
        'w': Record_string_StatValues_;
        'r': Record_string_StatValues_;
    };
    ioThroughput?: {
        'w': Record_string_StatValues_;
        'r': Record_string_StatValues_;
    };
    cpus?: Record_string_StatValues_;
};

