/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType_void_ } from '../models/CreateActionReturnType_void_';
import type { Omit_Unbrand_Parameters_Xapi_91_VBD_create_93___91_0_93___VM_or_VDI_ } from '../models/Omit_Unbrand_Parameters_Xapi_91_VBD_create_93___91_0_93___VM_or_VDI_';
import type { SendObjects_Partial_Unbrand_XoAlarm___ } from '../models/SendObjects_Partial_Unbrand_XoAlarm___';
import type { SendObjects_Partial_Unbrand_XoMessage___ } from '../models/SendObjects_Partial_Unbrand_XoMessage___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { SendObjects_Partial_Unbrand_XoVbd___ } from '../models/SendObjects_Partial_Unbrand_XoVbd___';
import type { Unbrand_XoVbd_ } from '../models/Unbrand_XoVbd_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VbdsService {
    /**
     * Returns all VBDs that match the following privilege:
     * - resource: vbd, action: read
     * @returns SendObjects_Partial_Unbrand_XoVbd___ Ok
     * @throws ApiError
     */
    public static getVbds({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVbd___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vbds',
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
     * Create a VBD to attach a VDI to a VM
     * @returns any Resource created
     * @throws ApiError
     */
    public static createVbd({
        requestBody,
    }: {
        requestBody: (Omit_Unbrand_Parameters_Xapi_91_VBD_create_93___91_0_93___VM_or_VDI_ & {
            VDI: string;
            VM: string;
        }),
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vbds',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
                422: `Invalid parameters`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vbd, action: read
     * @returns Unbrand_XoVbd_ Ok
     * @throws ApiError
     */
    public static getVbd({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoVbd_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vbds/{id}',
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
     * Delete a VBD
     *
     * Removes the virtual block device, detaching the VDI from the VM.
     * The VDI itself is NOT deleted.
     * @returns void
     * @throws ApiError
     */
    public static deleteVbd({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vbds/{id}',
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
    /**
     * Returns all alarms that match the following privilege:
     * - resource: alarm, action: read
     * @returns SendObjects_Partial_Unbrand_XoAlarm___ Ok
     * @throws ApiError
     */
    public static getVbdAlarms({
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
            url: '/vbds/{id}/alarms',
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
    public static getVbdMessages({
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
            url: '/vbds/{id}/messages',
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
    public static getVbdTasks({
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
            url: '/vbds/{id}/tasks',
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
     * Hotplug the VBD, dynamically attaching it to the running VM
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static connectVbd({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vbds/{id}/actions/connect',
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
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Hot-unplug the VBD, dynamically detaching it from the running VM
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static disconnectVbd({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vbds/{id}/actions/disconnect',
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
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
}
