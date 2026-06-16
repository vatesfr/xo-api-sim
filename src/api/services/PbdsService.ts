/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType_void_ } from '../models/CreateActionReturnType_void_';
import type { SendObjects_Partial_Unbrand_XoPbd___ } from '../models/SendObjects_Partial_Unbrand_XoPbd___';
import type { Unbrand_XoPbd_ } from '../models/Unbrand_XoPbd_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PbdsService {
    /**
     * Returns all PBDs that match the following privilege:
     * - resource: pbd, action: read
     * @returns SendObjects_Partial_Unbrand_XoPbd___ Ok
     * @throws ApiError
     */
    public static getPbds({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoPbd___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pbds',
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
     * - resource: pbd, action: read
     * @returns Unbrand_XoPbd_ Ok
     * @throws ApiError
     */
    public static getPbd({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoPbd_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pbds/{id}',
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
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static plugPbd({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pbds/{id}/actions/plug',
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
    public static unplugPbd({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pbds/{id}/actions/unplug',
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
}
