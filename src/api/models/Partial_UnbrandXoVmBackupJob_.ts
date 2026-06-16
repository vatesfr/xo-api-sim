/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Unbrand_XoVmBackupJobScheduleSettings_ } from './Unbrand_XoVmBackupJobScheduleSettings_';
/**
 * Make all properties in T optional
 */
export type Partial_UnbrandXoVmBackupJob_ = {
    id?: string;
    type?: 'backup';
    name?: string;
    compression?: '' | 'native' | 'zstd';
    proxy?: string;
    mode?: 'full' | 'delta';
    remotes?: any;
    vms?: any;
    srs?: any;
    settings?: Record<string, Unbrand_XoVmBackupJobScheduleSettings_>;
};

