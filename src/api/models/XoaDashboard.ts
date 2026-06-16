/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HasNoAuthorization } from './HasNoAuthorization';
import type { IsEmptyData } from './IsEmptyData';
import type { IsMaybeExpired_DashboardBackupRepositoriesSizeInfo_ } from './IsMaybeExpired_DashboardBackupRepositoriesSizeInfo_';
import type { IsMaybeExpired_DashboardBackupsInfo_ } from './IsMaybeExpired_DashboardBackupsInfo_';
import type { IsMaybeExpired_IsEmptyData_ } from './IsMaybeExpired_IsEmptyData_';
import type { MissingPatchesInfo } from './MissingPatchesInfo';
import type { PromiseWriteInStreamError } from './PromiseWriteInStreamError';
import type { SrSizeInfo } from './SrSizeInfo';
export type XoaDashboard = {
    poolsStatus: {
        total: number;
        unknown: number;
        unreachable: number;
        disconnected: number;
        connected: number;
    };
    resourcesOverview: ({
        srSize: number;
        memorySize: number;
        nCpus: number;
    } | IsEmptyData);
    backups?: (IsMaybeExpired_DashboardBackupsInfo_ | IsMaybeExpired_IsEmptyData_ | PromiseWriteInStreamError);
    storageRepositories: (SrSizeInfo | PromiseWriteInStreamError | IsEmptyData);
    backupRepositories?: (IsMaybeExpired_DashboardBackupRepositoriesSizeInfo_ | IsMaybeExpired_IsEmptyData_ | PromiseWriteInStreamError);
    missingPatches: (MissingPatchesInfo | HasNoAuthorization | PromiseWriteInStreamError);
    vmsStatus: {
        total: number;
        unknown: number;
        suspended: number;
        running: number;
        paused: number;
        inactive: number;
        halted: number;
        active: number;
    };
    hostsStatus: {
        total: number;
        unknown: number;
        halted: number;
        running: number;
        disabled: number;
    };
    nHosts: number;
    nPools: number;
};

