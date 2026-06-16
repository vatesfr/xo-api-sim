/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoSm___ } from '../models/SendObjects_Partial_Unbrand_XoSm___';
import type { Unbrand_XoSm_ } from '../models/Unbrand_XoSm_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SmsService {
    /**
     * Returns all SMs that match the following privilege:
     * - resource: sm, action: read
     * @returns SendObjects_Partial_Unbrand_XoSm___ Ok
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoSm___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sms',
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
     * - resource: sm, action: read
     * @returns Unbrand_XoSm_ Ok
     * @throws ApiError
     */
    public static getSr({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoSm_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sms/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
            },
        });
    }
}
