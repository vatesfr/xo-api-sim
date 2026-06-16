/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { XoMetadataBackupJobScheduleSettings } from './XoMetadataBackupJobScheduleSettings';
/**
 * Make all properties in T optional
 */
export type Partial_UnbrandXoMetadataBackupJob_ = {
    id?: string;
    type?: 'metadataBackup';
    name?: string;
    proxy?: string;
    xoMetadata?: boolean;
    userId?: string;
    pools?: any;
    remotes?: any;
    settings?: Record<string, XoMetadataBackupJobScheduleSettings>;
};

