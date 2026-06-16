/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DashboardBackupRepositoriesSizeInfo = {
    other?: {
        size: {
            used?: number;
            total?: number;
            other?: number;
            backups: number;
            available?: number;
        };
    };
    s3?: {
        size: {
            backups: number;
        };
    };
};

