/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseCreateNetworkBody } from '../models/BaseCreateNetworkBody';
import type { CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___ } from '../models/CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___';
import type { CreateActionReturnType__id_Unbrand_XoVm__91_id_93___ } from '../models/CreateActionReturnType__id_Unbrand_XoVm__91_id_93___';
import type { CreateActionReturnType_void_ } from '../models/CreateActionReturnType_void_';
import type { PoolDashboard } from '../models/PoolDashboard';
import type { Record_XoHost_at_id_XapiHostStats_or__error_Record_string_unknown___ } from '../models/Record_XoHost_at_id_XapiHostStats_or__error_Record_string_unknown___';
import type { SendObjects_Partial_Unbrand_XoAlarm___ } from '../models/SendObjects_Partial_Unbrand_XoAlarm___';
import type { SendObjects_Partial_Unbrand_XoMessage___ } from '../models/SendObjects_Partial_Unbrand_XoMessage___';
import type { SendObjects_Partial_Unbrand_XoPool___ } from '../models/SendObjects_Partial_Unbrand_XoPool___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { Unbrand_CreateBondedNetworkBody_ } from '../models/Unbrand_CreateBondedNetworkBody_';
import type { Unbrand_CreateNetworkBody_ } from '../models/Unbrand_CreateNetworkBody_';
import type { Unbrand_CreateVmBody_ } from '../models/Unbrand_CreateVmBody_';
import type { Unbrand_XoPool_ } from '../models/Unbrand_XoPool_';
import type { XapiStatsGranularity } from '../models/XapiStatsGranularity';
import type { XcpPatches } from '../models/XcpPatches';
import type { XsPatches } from '../models/XsPatches';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PoolsService {
    /**
     * Returns all pools that match the following privilege:
     * - resource: pool, action: read
     * @returns SendObjects_Partial_Unbrand_XoPool___ Ok
     * @throws ApiError
     */
    public static getPools({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoPool___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pools',
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
     * - resource: pool, action: read
     * @returns Unbrand_XoPool_ Ok
     * @throws ApiError
     */
    public static getPool({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoPool_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pools/{id}',
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
     * - resource: pool, action: create:network
     * - resource: network, action: create
     * @returns CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___ Resource created
     * @returns any Action executed asynchronously
     * @throws ApiError
     */
    public static createNetwork({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: Unbrand_CreateNetworkBody_,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/create_network',
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
     * @returns CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___ Resource created
     * @returns any Action executed asynchronously
     * @throws ApiError
     */
    public static createBondedNetwork({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: Unbrand_CreateBondedNetworkBody_,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/create_bonded_network',
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
                404: `Resource not found`,
                422: `Invalid parameters`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * @returns CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___ Resource created
     * @returns any Action executed asynchronously
     * @throws ApiError
     */
    public static createInternalNetwork({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: BaseCreateNetworkBody,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/create_internal_network',
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
                404: `Resource not found`,
                422: `Invalid parameters`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: pool, action: emergency-shutdown
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static emergencyShutdown({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/emergency_shutdown',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
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
     * Required privilege:
     * - resource: pool, action: rolling-reboot
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static rollingReboot({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/rolling_reboot',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
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
     * Required privilege:
     * - resource: pool, action: rolling-update
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static rollingUpdate({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/rolling_update',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
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
     * Required privilege:
     * - resource: pool, action: create:vm
     * - resource: vm-template, action: instantiate
     * - resource: vdi, action: create (if vdis is passed)
     * - resource: vdi, action: boot (if install.repository is passed)
     * - resource: vif, action: create (if vifs is passed)
     * - resource: host, action: allow-vm (if affinity is passed)
     * @returns CreateActionReturnType__id_Unbrand_XoVm__91_id_93___ Resource created
     * @returns any Action executed asynchronously
     * @throws ApiError
     */
    public static createVm({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: Unbrand_CreateVmBody_,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType__id_Unbrand_XoVm__91_id_93___ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/create_vm',
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
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: pool, action: read
     * @returns Record_XoHost_at_id_XapiHostStats_or__error_Record_string_unknown___ Ok
     * @throws ApiError
     */
    public static getStats({
        id,
        granularity,
    }: {
        id: string,
        granularity?: XapiStatsGranularity,
    }): CancelablePromise<Record_XoHost_at_id_XapiHostStats_or__error_Record_string_unknown___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pools/{id}/stats',
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
            },
        });
    }
    /**
     * Required privilege:
     * - resource: pool, action: read
     * @returns any Ok
     * @throws ApiError
     */
    public static getPoolDashboard({
        id,
        ndjson,
    }: {
        id: string,
        ndjson?: boolean,
    }): CancelablePromise<PoolDashboard> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pools/{id}/dashboard',
            path: {
                'id': id,
            },
            query: {
                'ndjson': ndjson,
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
     * Returns all alarms that match the following privilege:
     * - resource: alarm, action: read
     * @returns SendObjects_Partial_Unbrand_XoAlarm___ Ok
     * @throws ApiError
     */
    public static getPoolAlarms({
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
            url: '/pools/{id}/alarms',
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
     * - resource: pool, action: read
     * @returns any Ok
     * @throws ApiError
     */
    public static getPoolMissingPatches({
        id,
    }: {
        id: string,
    }): CancelablePromise<(Array<XcpPatches> | Array<XsPatches>)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pools/{id}/missing_patches',
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
    public static getPoolMessages({
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
            url: '/pools/{id}/messages',
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
     * - resource: pool, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putPoolTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/pools/{id}/tags/{tag}',
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
     * - resource: pool, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deletePoolTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/pools/{id}/tags/{tag}',
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
     * Returns all tasks that match the following privilege:
     * - resource: task, action: read
     * @returns SendObjects_Partial_Unbrand_XoTask___ Ok
     * @throws ApiError
     */
    public static getPoolTasks({
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
            url: '/pools/{id}/tasks',
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
     * Reconfigure the management interface for all hosts in the pool to use the given network.
     *
     * Each host in the pool will switch their management interface to a PIF on the specified network.
     * The PIFs on the target network must already have IP addresses configured.
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
            network: string;
        },
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/management_reconfigure',
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
                404: `Resource not found`,
                422: `Invalid parameters`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Import an XVA VM into a pool
     *
     * Required privilege:
     * - resource: sr, action: import:vm
     * @returns any VM imported
     * @throws ApiError
     */
    public static importVm({
        id,
        requestBody,
        sr,
    }: {
        id: string,
        requestBody: ,
        sr?: string,
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/vms',
            path: {
                'id': id,
            },
            query: {
                'sr': sr,
            },
            body: requestBody,
            mediaType: 'application/octet-stream',
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
