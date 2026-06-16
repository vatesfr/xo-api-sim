/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { XcpPatches } from './XcpPatches';
import type { XsPatches } from './XsPatches';
export type PoolDashboard = {
    cpuProvisioning: {
        percent: number;
        assigned: number;
        total: number;
    };
    alarms: Array<string>;
    srs: {
        topFiveUsage: Array<{
            size: number;
            physical_usage: number;
            percent: number;
            id: string;
            name_label: string;
        }>;
    };
    vms: {
        topFiveUsage?: {
            isExpired?: boolean;
            ram: Array<{
                memoryFree: number;
                memory: number;
                percent: number;
                name_label: string;
                id: string;
            }>;
            cpu: Array<{
                percent: number;
                name_label: string;
                id: string;
            }>;
        };
        status: {
            suspended: number;
            total: number;
            paused: number;
            halted: number;
            running: number;
        };
    };
    hosts: {
        missingPatches: ({
            hasAuthorization: boolean;
        } | {
            missingPatches: (Array<XcpPatches> | Array<XsPatches>);
            hasAuthorization: boolean;
        });
        topFiveUsage: {
            cpu: Array<{
                id: string;
                percent: number;
                name_label: string;
            }>;
            ram: Array<{
                id: string;
                percent: number;
                usage: number;
                size: number;
                name_label: string;
            }>;
        };
        status: {
            total: number;
            halted: number;
            disabled: number;
            running: number;
        };
    };
};

