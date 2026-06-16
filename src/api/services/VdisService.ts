/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType__id_Unbrand_XoVdi__91_id_93___ } from '../models/CreateActionReturnType__id_Unbrand_XoVdi__91_id_93___';
import type { CreateVdiBody } from '../models/CreateVdiBody';
import type { Exclude_SUPPORTED_VDI_FORMAT_qcow2_ } from '../models/Exclude_SUPPORTED_VDI_FORMAT_qcow2_';
import type { SendObjects_Partial_Unbrand_XoAlarm___ } from '../models/SendObjects_Partial_Unbrand_XoAlarm___';
import type { SendObjects_Partial_Unbrand_XoMessage___ } from '../models/SendObjects_Partial_Unbrand_XoMessage___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { SendObjects_Partial_Unbrand_XoVdi___ } from '../models/SendObjects_Partial_Unbrand_XoVdi___';
import type { SendObjects_Partial_Unbrand_XoVdiSnapshot___ } from '../models/SendObjects_Partial_Unbrand_XoVdiSnapshot___';
import type { Unbrand_XoVdi_ } from '../models/Unbrand_XoVdi_';
import type { Unbrand_XoVdiSnapshot_ } from '../models/Unbrand_XoVdiSnapshot_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VdisService {
    /**
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdi___ Ok
     * @throws ApiError
     */
    public static getVmVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdi___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}/vdis',
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
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdi___ Ok
     * @throws ApiError
     */
    public static getVmTemplateVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdi___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-templates/{id}/vdis',
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
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdiSnapshot___ Ok
     * @throws ApiError
     */
    public static getVmSnapshotVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdiSnapshot___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-snapshots/{id}/vdis',
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
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdi___ Ok
     * @throws ApiError
     */
    public static getVmControllerVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdi___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-controllers/{id}/vdis',
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
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdi___ Ok
     * @throws ApiError
     */
    public static getVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdi___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vdis',
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
     * Create an empty VDI.
     * @returns any Resource created
     * @throws ApiError
     */
    public static createVdi({
        requestBody,
    }: {
        requestBody: CreateVdiBody,
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vdis',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vdi, action: read
     * @returns Unbrand_XoVdi_ Ok
     * @throws ApiError
     */
    public static getVdi({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoVdi_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vdis/{id}',
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
     * - resource: vdi, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteVdi({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vdis/{id}',
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
    public static getVdiAlarms({
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
            url: '/vdis/{id}/alarms',
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
    public static getVdiMessages({
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
            url: '/vdis/{id}/messages',
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
    public static getVdiTasks({
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
            url: '/vdis/{id}/tasks',
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
     * Migrate a VDI to another SR.
     *
     * Note: After migration, the VDI will have a new ID. The new ID is returned in the response.
     * @returns any Ok
     * @returns CreateActionReturnType__id_Unbrand_XoVdi__91_id_93___ Action executed asynchronously
     * @throws ApiError
     */
    public static migrateVdi({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: {
            srId: string;
        },
        sync?: boolean,
    }): CancelablePromise<any | CreateActionReturnType__id_Unbrand_XoVdi__91_id_93___> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vdis/{id}/actions/migrate',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vdi, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putVdiTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vdis/{id}/tags/{tag}',
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
     * - resource: vdi, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deleteVdiTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vdis/{id}/tags/{tag}',
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
     * Returns all VDI snapshots that match the following privilege:
     * - resource: vdi-snapshot, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdiSnapshot___ Ok
     * @throws ApiError
     */
    public static getVdiSnapshots({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdiSnapshot___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vdi-snapshots',
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
     * Export VDI-snapshot content
     * @returns string Download started
     * @throws ApiError
     */
    public static exportVdiSnapshotContent({
        id,
        format,
    }: {
        id: string,
        format: Exclude_SUPPORTED_VDI_FORMAT_qcow2_,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vdi-snapshots/{id}.{format}',
            path: {
                'id': id,
                'format': format,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
                422: `Invalid format`,
            },
        });
    }
    /**
     * @returns Unbrand_XoVdiSnapshot_ Ok
     * @throws ApiError
     */
    public static getVdiSnapshot({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoVdiSnapshot_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vdi-snapshots/{id}',
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
     * @returns void
     * @throws ApiError
     */
    public static deleteVdiSnapshot({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vdi-snapshots/{id}',
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
    public static getVdiSnapshotAlarms({
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
            url: '/vdi-snapshots/{id}/alarms',
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
    public static getVdiSnapshotMessages({
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
            url: '/vdi-snapshots/{id}/messages',
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
    public static getVdiSnapshotTasks({
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
            url: '/vdi-snapshots/{id}/tasks',
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
     * @returns void
     * @throws ApiError
     */
    public static putVdiSnapshotTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vdi-snapshots/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static deleteVdiSnapshotTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vdi-snapshots/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
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
    /**
     *
     * Export VDI content
     *
     * Required privilege:
     * - resource: vdi, action: export-content
     * @returns string Download started
     * @throws ApiError
     */
    public static exportVdiContent({
        id,
        format,
    }: {
        id: string,
        format: Exclude_SUPPORTED_VDI_FORMAT_qcow2_,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vdis/{id}.{format}',
            path: {
                'id': id,
                'format': format,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid format`,
            },
        });
    }
    /**
     *
     * Import VDI content
     *
     * Required privilege:
     * - resource: vdi, action: import-content
     * @returns void
     * @throws ApiError
     */
    public static importVdiContent({
        id,
        format,
        requestBody,
    }: {
        id: string,
        format: Exclude_SUPPORTED_VDI_FORMAT_qcow2_,
        requestBody: ,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vdis/{id}.{format}',
            path: {
                'id': id,
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/octet-stream',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid format`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
}
