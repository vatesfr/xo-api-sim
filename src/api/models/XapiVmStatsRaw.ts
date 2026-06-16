/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_StatValues_ } from './Record_string_StatValues_';
import type { StatValues } from './StatValues';
export type XapiVmStatsRaw = {
    vbdAvgquSz?: Record_string_StatValues_;
    vbdInflight?: Record_string_StatValues_;
    vbdIowait?: Record_string_StatValues_;
    vbdLatency?: {
        'r': Record_string_StatValues_;
        'w': Record_string_StatValues_;
    };
    xvds?: {
        total?: Record_string_StatValues_;
        'r'?: Record_string_StatValues_;
        'w'?: Record_string_StatValues_;
    };
    vifErrors?: {
        tx: Record_string_StatValues_;
        rx: Record_string_StatValues_;
    };
    vifs?: {
        tx: Record_string_StatValues_;
        rx: Record_string_StatValues_;
    };
    memoryTarget?: StatValues;
    memoryFree?: StatValues;
    memory?: StatValues;
    iops?: {
        'w': Record_string_StatValues_;
        'r': Record_string_StatValues_;
    };
    runstateBlocked?: StatValues;
    runstateConcurrencyHazard?: StatValues;
    runstatePartialContention?: StatValues;
    runstatePartialRun?: StatValues;
    runstateFullContention?: StatValues;
    runstateFullrun?: StatValues;
    cpuUsage?: StatValues;
    cpus?: Record_string_StatValues_;
};

