/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoBackupLog___ } from '../models/SendObjects_Partial_Unbrand_XoBackupLog___';
import type { Unbrand_XoBackupLog_ } from '../models/Unbrand_XoBackupLog_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackupLogsService {
    /**
     * Returns all backup logs that match the following privilege:
     * - resource: backup-log, action: read
     * @returns SendObjects_Partial_Unbrand_XoBackupLog___ Ok
     * @throws ApiError
     */
    public static getBackupLogs({
        fields,
        ndjson,
        markdown,
        filter,
        limit,
    }: {
        fields?: string,
        ndjson?: boolean,
        markdown?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoBackupLog___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup-logs',
            query: {
                'fields': fields,
                'ndjson': ndjson,
                'markdown': markdown,
                'filter': filter,
                'limit': limit,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: backup-log, action: read
     * @returns Unbrand_XoBackupLog_ Ok
     * @throws ApiError
     */
    public static getBackupLog({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoBackupLog_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup-logs/{id}',
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
    /**
     * @deprecated
     * Returns all backup logs that match the following privilege:
     * - resource: backup-log, action: read
     * @returns SendObjects_Partial_Unbrand_XoBackupLog___ Ok
     * @throws ApiError
     */
    public static getDeprecatedBackupLogs({
        fields,
        ndjson,
        markdown,
        filter,
        limit,
    }: {
        fields?: string,
        ndjson?: boolean,
        markdown?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoBackupLog___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup/logs',
            query: {
                'fields': fields,
                'ndjson': ndjson,
                'markdown': markdown,
                'filter': filter,
                'limit': limit,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
            },
        });
    }
    /**
     * @deprecated
     * @returns Unbrand_XoBackupLog_ Ok
     * @throws ApiError
     */
    public static getDeprecatedBackupLog({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoBackupLog_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup/logs/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
            },
        });
    }
}
