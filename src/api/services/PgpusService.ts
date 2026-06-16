/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoPgpu___ } from '../models/SendObjects_Partial_Unbrand_XoPgpu___';
import type { Unbrand_XoPgpu_ } from '../models/Unbrand_XoPgpu_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PgpusService {
    /**
     * Returns all PGPUs that match the following privilege:
     * - resource: pgpu, action: read
     * @returns SendObjects_Partial_Unbrand_XoPgpu___ Ok
     * @throws ApiError
     */
    public static getPgpus({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoPgpu___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pgpus',
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
     * - resource: pgpu, action: read
     * @returns Unbrand_XoPgpu_ Ok
     * @throws ApiError
     */
    public static getPgpu({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoPgpu_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pgpus/{id}',
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
