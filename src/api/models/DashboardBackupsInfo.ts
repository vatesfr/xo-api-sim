/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BACKUP_TYPE } from './BACKUP_TYPE';
export type DashboardBackupsInfo = {
    vmsProtection: {
        notInJob: number;
        unprotected: number;
        protected: number;
    };
    issues: Array<{
        uuid: string;
        type: BACKUP_TYPE;
        name?: string;
        logs: Array<'failure' | 'interrupted' | 'skipped' | 'success'>;
    }>;
    jobs: {
        total: number;
        successful: number;
        skipped: number;
        noRecentRun: number;
        failed: number;
        disabled: number;
    };
};

