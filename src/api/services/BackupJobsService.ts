/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_UnbrandAnyXoBackupJob__ } from '../models/SendObjects_Partial_UnbrandAnyXoBackupJob__';
import type { SendObjects_Partial_UnbrandXoMetadataBackupJob__ } from '../models/SendObjects_Partial_UnbrandXoMetadataBackupJob__';
import type { SendObjects_Partial_UnbrandXoMirrorBackupJob__ } from '../models/SendObjects_Partial_UnbrandXoMirrorBackupJob__';
import type { SendObjects_Partial_UnbrandXoVmBackupJob__ } from '../models/SendObjects_Partial_UnbrandXoVmBackupJob__';
import type { Unbrand_UnbrandedXoMetadataBackupJob_ } from '../models/Unbrand_UnbrandedXoMetadataBackupJob_';
import type { Unbrand_UnbrandedXoMirrorBackupJob_ } from '../models/Unbrand_UnbrandedXoMirrorBackupJob_';
import type { Unbrand_UnbrandedXoVmBackupJob_ } from '../models/Unbrand_UnbrandedXoVmBackupJob_';
import type { UnbrandAnyXoBackupJob } from '../models/UnbrandAnyXoBackupJob';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackupJobsService {
    /**
     * Returns all backup jobs that match the following privilege:
     * - resource: backup-job, action: read
     * @returns SendObjects_Partial_UnbrandXoVmBackupJob__ Ok
     * @throws ApiError
     */
    public static vmGetVmBackupJobs({
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
    }): CancelablePromise<SendObjects_Partial_UnbrandXoVmBackupJob__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}/backup-jobs',
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
     * Returns all backup jobs that match the following privilege:
     * - resource: backup-job, action: read
     * @returns SendObjects_Partial_UnbrandAnyXoBackupJob__ Ok
     * @throws ApiError
     */
    public static getBackupJobs({
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
    }): CancelablePromise<SendObjects_Partial_UnbrandAnyXoBackupJob__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup-jobs',
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
     * - resource: backup-job, action: read
     * @returns UnbrandAnyXoBackupJob Ok
     * @throws ApiError
     */
    public static getBackupJob({
        id,
    }: {
        id: string,
    }): CancelablePromise<UnbrandAnyXoBackupJob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup-jobs/{id}',
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
     * @deprecated
     * Returns all VM backup jobs that match the following privilege:
     * - resource: backup-job, action: read
     * @returns SendObjects_Partial_UnbrandXoVmBackupJob__ Ok
     * @throws ApiError
     */
    public static getVmBackupJobs({
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
    }): CancelablePromise<SendObjects_Partial_UnbrandXoVmBackupJob__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup/jobs/vm',
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
     * @deprecated
     * @returns Unbrand_UnbrandedXoVmBackupJob_ Ok
     * @throws ApiError
     */
    public static getVmBackupJob({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_UnbrandedXoVmBackupJob_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup/jobs/vm/{id}',
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
     * @deprecated
     * Returns all metadata backup jobs that match the following privilege:
     * - resource: backup-job, action: read
     * @returns SendObjects_Partial_UnbrandXoMetadataBackupJob__ Ok
     * @throws ApiError
     */
    public static getMetadataBackupJobs({
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
    }): CancelablePromise<SendObjects_Partial_UnbrandXoMetadataBackupJob__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup/jobs/metadata',
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
     * @deprecated
     * @returns Unbrand_UnbrandedXoMetadataBackupJob_ Ok
     * @throws ApiError
     */
    public static getMetadataBackupJob({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_UnbrandedXoMetadataBackupJob_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup/jobs/metadata/{id}',
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
     * @deprecated
     * Returns all mirror backup jobs that match the following privilege:
     * - resource: backup-job, action: read
     * @returns SendObjects_Partial_UnbrandXoMirrorBackupJob__ Ok
     * @throws ApiError
     */
    public static getMirrorBackupJobs({
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
    }): CancelablePromise<SendObjects_Partial_UnbrandXoMirrorBackupJob__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup/jobs/mirror',
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
     * @deprecated
     * @returns Unbrand_UnbrandedXoMirrorBackupJob_ Ok
     * @throws ApiError
     */
    public static getMirrorBackupJob({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_UnbrandedXoMirrorBackupJob_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup/jobs/mirror/{id}',
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
