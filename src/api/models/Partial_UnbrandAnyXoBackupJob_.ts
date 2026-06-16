/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Unbrand_XoMirrorBackupScheduleSettings_ } from './Unbrand_XoMirrorBackupScheduleSettings_';
import type { Unbrand_XoVmBackupJobScheduleSettings_ } from './Unbrand_XoVmBackupJobScheduleSettings_';
import type { XoMetadataBackupJobScheduleSettings } from './XoMetadataBackupJobScheduleSettings';
/**
 * Make all properties in T optional
 */
export type Partial_UnbrandAnyXoBackupJob_ = ({
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
} | {
    id?: string;
    type?: 'metadataBackup';
    name?: string;
    proxy?: string;
    xoMetadata?: boolean;
    userId?: string;
    pools?: any;
    remotes?: any;
    settings?: Record<string, XoMetadataBackupJobScheduleSettings>;
} | {
    id?: string;
    type?: 'mirrorBackup';
    name?: string;
    proxy?: string;
    mode?: 'full' | 'delta';
    sourceRemote?: string;
    remotes?: any;
    settings?: Record<string, Unbrand_XoMirrorBackupScheduleSettings_>;
});

