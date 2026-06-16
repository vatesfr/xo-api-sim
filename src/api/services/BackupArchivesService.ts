/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoVmBackupArchive___ } from '../models/SendObjects_Partial_Unbrand_XoVmBackupArchive___';
import type { Unbrand_XoVmBackupArchive_ } from '../models/Unbrand_XoVmBackupArchive_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackupArchivesService {
    /**
     * Returns all backup archives that match the following privilege:
     * - resource: backup-archive, action: read
     *
     * You can use the alias "*" in "backup-repository" to select all backup repositories.
     * @returns SendObjects_Partial_Unbrand_XoVmBackupArchive___ Ok
     * @throws ApiError
     */
    public static getBackupArchives({
        backupRepository,
        fields,
        ndjson,
        markdown,
        filter,
        limit,
    }: {
        backupRepository?: Array<string>,
        fields?: string,
        ndjson?: boolean,
        markdown?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVmBackupArchive___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup-archives',
            query: {
                'backup-repository': backupRepository,
                'fields': fields,
                'ndjson': ndjson,
                'markdown': markdown,
                'filter': filter,
                'limit': limit,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: backup-archive, action: read
     * @returns Unbrand_XoVmBackupArchive_ Ok
     * @throws ApiError
     */
    public static getBackupArchive({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoVmBackupArchive_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup-archives/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
            },
        });
    }
}
