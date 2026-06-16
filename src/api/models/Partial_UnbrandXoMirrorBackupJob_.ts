/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Unbrand_XoMirrorBackupScheduleSettings_ } from './Unbrand_XoMirrorBackupScheduleSettings_';
/**
 * Make all properties in T optional
 */
export type Partial_UnbrandXoMirrorBackupJob_ = {
    id?: string;
    type?: 'mirrorBackup';
    name?: string;
    proxy?: string;
    mode?: 'full' | 'delta';
    sourceRemote?: string;
    remotes?: any;
    settings?: Record<string, Unbrand_XoMirrorBackupScheduleSettings_>;
};

