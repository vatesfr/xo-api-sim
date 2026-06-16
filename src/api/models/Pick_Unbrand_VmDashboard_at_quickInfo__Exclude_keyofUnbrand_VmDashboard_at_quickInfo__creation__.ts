/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DOMAIN_TYPE } from './DOMAIN_TYPE';
import type { VM_POWER_STATE } from './VM_POWER_STATE';
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick_Unbrand_VmDashboard_at_quickInfo__Exclude_keyofUnbrand_VmDashboard_at_quickInfo__creation__ = {
    $pool: string;
    uuid: string;
    CPUs: {
        number: number;
    };
    memory: {
        size: number;
    };
    mainIpAddress?: string;
    name_description: string;
    os_version: {
        name?: string;
    };
    power_state: VM_POWER_STATE;
    pvDriversDetected: boolean;
    pvDriversUpToDate?: boolean;
    pvDriversVersion?: string;
    startTime?: number | null;
    tags: Array<string>;
    virtualizationMode: DOMAIN_TYPE;
    id: string;
    host?: string;
};

