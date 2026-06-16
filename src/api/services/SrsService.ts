/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType_void_ } from '../models/CreateActionReturnType_void_';
import type { SendObjects_Partial_Unbrand_XoAlarm___ } from '../models/SendObjects_Partial_Unbrand_XoAlarm___';
import type { SendObjects_Partial_Unbrand_XoMessage___ } from '../models/SendObjects_Partial_Unbrand_XoMessage___';
import type { SendObjects_Partial_Unbrand_XoSr___ } from '../models/SendObjects_Partial_Unbrand_XoSr___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { Unbrand_XoSr_ } from '../models/Unbrand_XoSr_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SrsService {
    /**
     * Returns all SRs that match the following privilege:
     * - resource: sr, action: read
     * @returns SendObjects_Partial_Unbrand_XoSr___ Ok
     * @throws ApiError
     */
    public static getSrs({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoSr___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/srs',
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
     * - resource: sr, action: read
     * @returns Unbrand_XoSr_ Ok
     * @throws ApiError
     */
    public static getSr({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoSr_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/srs/{id}',
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
     * - resource: sr, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteSr({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/srs/{id}',
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
    public static getSrAlarms({
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
            url: '/srs/{id}/alarms',
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
    public static getSrMessages({
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
            url: '/srs/{id}/messages',
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
    public static getSrTasks({
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
            url: '/srs/{id}/tasks',
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
     * - resource: sr, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putSrTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/srs/{id}/tags/{tag}',
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
     * - resource: sr, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deleteSrTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/srs/{id}/tags/{tag}',
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
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static reclaimSpaceSr({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/srs/{id}/actions/reclaim_space',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
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
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static scanSr({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/srs/{id}/actions/scan',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
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
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static forgetSr({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/srs/{id}/actions/forget',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
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
     * Import an exported VDI
     *
     * Required privilege:
     * - resource: sr, action: import:vdi
     * @returns any VDI imported
     * @throws ApiError
     */
    public static srImportVdi({
        id,
        requestBody,
        nameLabel,
        nameDescription,
        raw,
    }: {
        id: string,
        requestBody: ,
        nameLabel?: string,
        nameDescription?: string,
        raw?: boolean,
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/srs/{id}/vdis',
            path: {
                'id': id,
            },
            query: {
                'name_label': nameLabel,
                'name_description': nameDescription,
                'raw': raw,
            },
            body: requestBody,
            mediaType: 'application/octet-stream',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
            },
        });
    }
}
