/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Unbrand_XoMirrorBackupScheduleSettings_ } from './Unbrand_XoMirrorBackupScheduleSettings_';
export type Unbrand_UnbrandedXoMirrorBackupJob_ = {
    id: string;
    type: 'mirrorBackup';
    name?: string;
    proxy?: string;
    mode: 'full' | 'delta';
    sourceRemote: string;
    remotes: any;
    settings: Record<string, Unbrand_XoMirrorBackupScheduleSettings_>;
};

