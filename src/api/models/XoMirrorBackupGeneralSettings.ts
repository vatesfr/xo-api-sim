/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { XoBackupJobGeneralSettings } from './XoBackupJobGeneralSettings';
export type XoMirrorBackupGeneralSettings = (XoBackupJobGeneralSettings & {
    reportWhen: 'failure';
    backupReportTpl?: 'compactMjml';
    maxExportRate?: number;
    timeout?: number;
    mergeBackupsSynchronously?: boolean;
    nRetriesVmBackupFailures?: number;
    concurrency?: number;
});

