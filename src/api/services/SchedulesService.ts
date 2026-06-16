/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType_void_ } from '../models/CreateActionReturnType_void_';
import type { SendObjects_Partial_Unbrand_XoSchedule___ } from '../models/SendObjects_Partial_Unbrand_XoSchedule___';
import type { Unbrand_XoSchedule_ } from '../models/Unbrand_XoSchedule_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SchedulesService {
    /**
     * Returns all schedules that match the following privilege:
     * - resource: schedule, action: read
     * @returns SendObjects_Partial_Unbrand_XoSchedule___ Ok
     * @throws ApiError
     */
    public static getSchedules({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoSchedule___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules',
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
     *
     * Required privilege:
     * - resource: schedule, action: read
     * @returns Unbrand_XoSchedule_ Ok
     * @throws ApiError
     */
    public static getSchedule({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoSchedule_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules/{id}',
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
     *
     * Required privilege:
     * - resource: schedule, action: run
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static runSchedule({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schedules/{id}/actions/run',
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
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
}
