/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Make all properties in T optional
 */
export type Partial_Unbrand_XoVmBackupArchive__ = {
    id?: string;
    type?: 'xo-vm-backup';
    backupRepository?: string;
    disks?: Array<{
        uuid: string;
        name: string;
        id: string;
    }>;
    isImmutable?: boolean;
    jobId?: string;
    mode?: 'full' | 'delta';
    scheduleId?: string;
    size?: number;
    timestamp?: number;
    vm?: {
        tags: Array<string>;
        name_label: string;
        name_description: string;
        uuid: string;
    };
    differencingVhds?: number;
    dynamicVhds?: number;
    withMemory?: boolean;
};

