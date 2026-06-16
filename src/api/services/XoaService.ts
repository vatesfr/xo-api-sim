/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PingResponse } from '../models/PingResponse';
import type { XoaDashboard } from '../models/XoaDashboard';
import type { XoGuiRoutes } from '../models/XoGuiRoutes';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class XoaService {
    /**
     * @returns XoaDashboard Ok
     * @throws ApiError
     */
    public static getDashboard({
        ndjson,
    }: {
        ndjson?: boolean,
    }): CancelablePromise<XoaDashboard> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dashboard',
            query: {
                'ndjson': ndjson,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
            },
        });
    }
    /**
     * @returns PingResponse Ok
     * @throws ApiError
     */
    public static ping(): CancelablePromise<PingResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ping',
        });
    }
    /**
     * @returns XoGuiRoutes Ok
     * @throws ApiError
     */
    public static getGuiRoutes(): CancelablePromise<XoGuiRoutes> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gui-routes',
        });
    }
}
