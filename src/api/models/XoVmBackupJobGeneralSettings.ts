/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_unknown_ } from './Record_string_unknown_';
import type { XoBackupJobGeneralSettings } from './XoBackupJobGeneralSettings';
export type XoVmBackupJobGeneralSettings = (XoBackupJobGeneralSettings & {
    timeout?: number;
    offlineBackup?: boolean;
    mergeBackupsSynchronously?: boolean;
    timezone?: string;
    preferNbd?: boolean;
    nRetriesVmBackupFailures?: number;
    nbdConcurrency?: number;
    maxExportRate?: number;
    offlineSnapshot?: boolean;
    checkpointSnapshot?: boolean;
    longTermRetention?: {
        yearly?: {
            settings: Record_string_unknown_;
            retention: number;
        };
        monthly?: {
            settings: Record_string_unknown_;
            retention: number;
        };
        weekly?: {
            settings: Record_string_unknown_;
            retention: number;
        };
        daily?: {
            settings: Record_string_unknown_;
            retention: number;
        };
    };
    concurrency?: number;
    cbtDestroySnapshotData?: boolean;
});

