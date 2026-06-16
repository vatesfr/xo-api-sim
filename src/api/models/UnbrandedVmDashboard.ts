/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Omit_Unbrand_VmDashboard_at_quickInfo__creation_ } from './Omit_Unbrand_VmDashboard_at_quickInfo__creation_';
import type { Unbrand_VmDashboard_at_backupsInfo_91_replication_93__ } from './Unbrand_VmDashboard_at_backupsInfo_91_replication_93__';
import type { Unbrand_VmDashboard_at_quickInfo_91_creation_93__ } from './Unbrand_VmDashboard_at_quickInfo_91_creation_93__';
import type { Unbrand_VmDashboardBackupArchive_ } from './Unbrand_VmDashboardBackupArchive_';
import type { Unbrand_VmDashboardRun_ } from './Unbrand_VmDashboardRun_';
export type UnbrandedVmDashboard = {
    backupsInfo: {
        backupArchives: Array<Unbrand_VmDashboardBackupArchive_>;
        replication: Unbrand_VmDashboard_at_backupsInfo_91_replication_93__;
        vmProtection: 'protected' | 'unprotected' | 'not-in-active-job';
        lastRuns: Array<Unbrand_VmDashboardRun_>;
    };
    alarms: Array<string>;
    quickInfo: (Omit_Unbrand_VmDashboard_at_quickInfo__creation_ & {
        creation: Unbrand_VmDashboard_at_quickInfo_91_creation_93__;
    });
};

