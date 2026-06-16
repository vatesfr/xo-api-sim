/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseCreateNetworkBody } from '../models/BaseCreateNetworkBody';
import type { CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___ } from '../models/CreateActionReturnType__id_Unbrand_XoNetwork__91_id_93___';
import type { SendObjects_Partial_Unbrand_XoAlarm___ } from '../models/SendObjects_Partial_Unbrand_XoAlarm___';
import type { SendObjects_Partial_Unbrand_XoMessage___ } from '../models/SendObjects_Partial_Unbrand_XoMessage___';
import type { SendObjects_Partial_Unbrand_XoNetwork___ } from '../models/SendObjects_Partial_Unbrand_XoNetwork___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { Unbrand_CreateBondedNetworkBody_ } from '../models/Unbrand_CreateBondedNetworkBody_';
import type { Unbrand_CreateNetworkBody_ } from '../models/Unbrand_CreateNetworkBody_';
import type { Unbrand_XoNetwork_ } from '../models/Unbrand_XoNetwork_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NetworksService {
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
     * Returns all networks that match the following privilege:
     * - resource: network, action: read
     * @returns SendObjects_Partial_Unbrand_XoNetwork___ Ok
     * @throws ApiError
     */
    public static getNetworks({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoNetwork___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks',
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
     * - resource: network, action: read
     * @returns Unbrand_XoNetwork_ Ok
     * @throws ApiError
     */
    public static getNetwork({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoNetwork_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks/{id}',
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
     * - resource: network, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteNetwork({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/networks/{id}',
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
     * Returns all alarms that match the following privilege:
     * - resource: alarm, action: read
     * @returns SendObjects_Partial_Unbrand_XoAlarm___ Ok
     * @throws ApiError
     */
    public static getNetworkAlarms({
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
            url: '/networks/{id}/alarms',
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
     * Returns all messages that match the following privilege:
     * - resource: message, action: read
     * @returns SendObjects_Partial_Unbrand_XoMessage___ Ok
     * @throws ApiError
     */
    public static getNetworkMessages({
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
            url: '/networks/{id}/messages',
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
    public static getNetworkTasks({
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
            url: '/networks/{id}/tasks',
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
     * - resource: network, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putNetworkTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/networks/{id}/tags/{tag}',
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
     * - resource: network, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deleteNetworkTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/networks/{id}/tags/{tag}',
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
}
