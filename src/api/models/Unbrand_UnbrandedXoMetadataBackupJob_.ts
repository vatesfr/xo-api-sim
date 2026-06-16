/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { XoMetadataBackupJobScheduleSettings } from './XoMetadataBackupJobScheduleSettings';
export type Unbrand_UnbrandedXoMetadataBackupJob_ = {
    id: string;
    type: 'metadataBackup';
    name?: string;
    proxy?: string;
    xoMetadata?: boolean;
    userId: string;
    pools?: any;
    remotes: any;
    settings: Record<string, XoMetadataBackupJobScheduleSettings>;
};

