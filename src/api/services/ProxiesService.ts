/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoProxy___ } from '../models/SendObjects_Partial_Unbrand_XoProxy___';
import type { Unbrand_XoProxy_ } from '../models/Unbrand_XoProxy_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProxiesService {
    /**
     * Returns all proxies that match the following privilege:
     * - resource: proxy, action: read
     * @returns SendObjects_Partial_Unbrand_XoProxy___ Ok
     * @throws ApiError
     */
    public static getProxies({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoProxy___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/proxies',
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
     * - resource: proxy, action: read
     * @returns Unbrand_XoProxy_ Ok
     * @throws ApiError
     */
    public static getProxy({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoProxy_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/proxies/{id}',
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
