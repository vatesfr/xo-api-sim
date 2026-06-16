/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType_void_ } from '../models/CreateActionReturnType_void_';
import type { InsertableXoServer } from '../models/InsertableXoServer';
import type { SendObjects_Partial_Unbrand_XoServer___ } from '../models/SendObjects_Partial_Unbrand_XoServer___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { Unbrand_XoServer_ } from '../models/Unbrand_XoServer_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ServersService {
    /**
     * Returns all servers that match the following privilege:
     * - resource: server, action: read
     * @returns SendObjects_Partial_Unbrand_XoServer___ Ok
     * @throws ApiError
     */
    public static getServers({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoServer___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers',
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
     * - resource: server, action: create
     * @returns any Resource created
     * @throws ApiError
     */
    public static addServer({
        requestBody,
    }: {
        requestBody: InsertableXoServer,
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                409: `Resource already exists`,
                422: `Invalid parameters`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: server, action: read
     * @returns Unbrand_XoServer_ Ok
     * @throws ApiError
     */
    public static getServer({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoServer_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{id}',
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
     * - resource: server, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteServer({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/servers/{id}',
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
     * - resource: server, action: connect
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static connectServer({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{id}/actions/connect',
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
                409: `The server is already connected`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: server, action: disconnect
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static disconnectServer({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{id}/actions/disconnect',
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
                409: `The server is already disconnected`,
            },
        });
    }
    /**
     * Returns all tasks that match the following privilege:
     * - resource: task, action: read
     * @returns SendObjects_Partial_Unbrand_XoTask___ Ok
     * @throws ApiError
     */
    public static getServerTasks({
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
            url: '/servers/{id}/tasks',
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
}
