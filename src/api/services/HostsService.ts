/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType_void_ } from '../models/CreateActionReturnType_void_';
import type { SendObjects_Partial_Unbrand_XoAlarm___ } from '../models/SendObjects_Partial_Unbrand_XoAlarm___';
import type { SendObjects_Partial_Unbrand_XoHost___ } from '../models/SendObjects_Partial_Unbrand_XoHost___';
import type { SendObjects_Partial_Unbrand_XoMessage___ } from '../models/SendObjects_Partial_Unbrand_XoMessage___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { Unbrand_XoHost_ } from '../models/Unbrand_XoHost_';
import type { XapiStatsGranularity } from '../models/XapiStatsGranularity';
import type { XapiStatsResponse_XapiHostStatsRaw_ } from '../models/XapiStatsResponse_XapiHostStatsRaw_';
import type { XcpPatches } from '../models/XcpPatches';
import type { XsPatches } from '../models/XsPatches';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HostsService {
    /**
     * Returns all hosts that match the following privilege:
     * - resource: host, action: read
     * @returns SendObjects_Partial_Unbrand_XoHost___ Ok
     * @throws ApiError
     */
    public static getHosts({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoHost___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts',
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
     * - resource: host, action: read
     * @returns Unbrand_XoHost_ Ok
     * @throws ApiError
     */
    public static getHost({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoHost_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}',
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
     * Required privilege:
     * - resource: host, action: read
     *
     * Host must be running
     * @returns XapiStatsResponse_XapiHostStatsRaw_ Ok
     * @throws ApiError
     */
    public static getHostStats({
        id,
        granularity,
    }: {
        id: string,
        granularity?: XapiStatsGranularity,
    }): CancelablePromise<XapiStatsResponse_XapiHostStatsRaw_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}/stats',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid granularity`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: host, action: export:logs
     *
     * Host must be running
     *
     * Download the audit log of a host.
     * @returns any Download started
     * @throws ApiError
     */
    public static getAuditLog({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}/audit.txt',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: host, action: export:logs
     *
     * Host must be running
     *
     * Download all logs of a host.
     * @returns any Download started
     * @throws ApiError
     */
    public static getHostLogs({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}/logs.tgz',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Returns all alarms that match the following privilege:
     * - resource: alarm, action: read
     * @returns SendObjects_Partial_Unbrand_XoAlarm___ Ok
     * @throws ApiError
     */
    public static getHostAlarms({
        id,
        fields,
        ndjson,
        markdown,
        filter,
        limit,
    }: {
        id: string,
        fields?: string,
        ndjson?: boolean,
        markdown?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoAlarm___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}/alarms',
            path: {
                'id': id,
            },
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
                404: `Resource not found`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: host, action: read
     *
     * Returns a boolean indicating whether SMT (Simultaneous Multi-Threading) is enabled
     * @returns any Ok
     * @throws ApiError
     */
    public static gethostSmt({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        enabled: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}/smt',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: host, action: read
     *
     * Host must be running
     * @returns any Ok
     * @throws ApiError
     */
    public static getMissingPatches({
        id,
    }: {
        id: string,
    }): CancelablePromise<(Array<XcpPatches> | Array<XsPatches>)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}/missing_patches',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Feature unauthorized`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Returns all messages that match the following privilege:
     * - resource: message, action: read
     * @returns SendObjects_Partial_Unbrand_XoMessage___ Ok
     * @throws ApiError
     */
    public static getHostMessages({
        id,
        fields,
        ndjson,
        markdown,
        filter,
        limit,
    }: {
        id: string,
        fields?: string,
        ndjson?: boolean,
        markdown?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoMessage___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}/messages',
            path: {
                'id': id,
            },
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
                404: `Resource not found`,
            },
        });
    }
    /**
     * Returns all tasks that match the following privilege:
     * - resource: task, action: read
     * @returns SendObjects_Partial_Unbrand_XoTask___ Ok
     * @throws ApiError
     */
    public static getHostTasks({
        id,
        fields,
        ndjson,
        markdown,
        filter,
        limit,
    }: {
        id: string,
        fields?: string,
        ndjson?: boolean,
        markdown?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoTask___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hosts/{id}/tasks',
            path: {
                'id': id,
            },
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
                404: `Resource not found`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: host, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putHostTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/hosts/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * Required privilege:
     * - resource: host, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deleteHostTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/hosts/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * Required privilege:
     * - resource: pif, action: update:management
     *
     * Reconfigure the management interface of the host to use the given PIF.
     *
     * The target PIF must already have an IP address configured.
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static managementReconfigure({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: {
            pif: string;
        },
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hosts/{id}/actions/management_reconfigure',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid parameters`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privileges:
     * - resource: host, action: disable
     * - resource: host, action: evacuate (if `evacuate: true`)
     *
     * Disable a host.
     *
     * Set `evacuate` to `true` to also evacuate all running VMs to other hosts in the pool.
     *
     * Use `vmIdsToForceMigrate` to unblock VMs whose migration is currently blocked (e.g. by `pool_migrate` or `migrate_send` blocked operations).
     *
     * Use `force` to ignore evacuation errors.
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static disable({
        id,
        sync,
        requestBody,
    }: {
        id: string,
        sync?: boolean,
        requestBody?: ({
            evacuate?: boolean;
        } | {
            vmIdsToForceMigrate?: Array<string>;
            force?: boolean;
            evacuate: boolean;
        }),
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hosts/{id}/actions/disable',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid parameters`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: host, action: enable
     *
     * Enable a host, taking it out of disabled state.
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static enable({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hosts/{id}/actions/enable',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
}
