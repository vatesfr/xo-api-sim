/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoPci___ } from '../models/SendObjects_Partial_Unbrand_XoPci___';
import type { Unbrand_XoPci_ } from '../models/Unbrand_XoPci_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PcisService {
    /**
     * Returns all PCIs that match the following privilege:
     * - resource: pci, action: read
     * @returns SendObjects_Partial_Unbrand_XoPci___ Ok
     * @throws ApiError
     */
    public static getPcis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoPci___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pcis',
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
     * - resource: pci, action: read
     * @returns Unbrand_XoPci_ Ok
     * @throws ApiError
     */
    public static getPci({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoPci_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pcis/{id}',
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
