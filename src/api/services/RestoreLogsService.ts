/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoRestoreLog___ } from '../models/SendObjects_Partial_Unbrand_XoRestoreLog___';
import type { Unbrand_XoRestoreLog_ } from '../models/Unbrand_XoRestoreLog_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RestoreLogsService {
    /**
     * Returns all restore logs that match the following privilege:
     * - resource: restore-log, action: read
     * @returns SendObjects_Partial_Unbrand_XoRestoreLog___ Ok
     * @throws ApiError
     */
    public static getRestoreLogs({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoRestoreLog___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/restore-logs',
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
     * - resource: restore-log, action: read
     * @returns Unbrand_XoRestoreLog_ Ok
     * @throws ApiError
     */
    public static getRestoreLog({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoRestoreLog_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/restore-logs/{id}',
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
     * Returns all restore logs that match the following privilege:
     * - resource: restore-log, action: read
     * @returns SendObjects_Partial_Unbrand_XoRestoreLog___ Ok
     * @throws ApiError
     */
    public static getDeprecatedRestoreLogs({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoRestoreLog___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/restore/logs',
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
     * @returns Unbrand_XoRestoreLog_ Ok
     * @throws ApiError
     */
    public static getDeprecatedRestoreLog({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoRestoreLog_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/restore/logs/{id}',
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
