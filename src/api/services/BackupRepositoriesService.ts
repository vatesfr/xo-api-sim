/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoBackupRepository___ } from '../models/SendObjects_Partial_Unbrand_XoBackupRepository___';
import type { Unbrand_XoBackupRepository_ } from '../models/Unbrand_XoBackupRepository_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackupRepositoriesService {
    /**
     * Returns all backup repositories that match the following privilege:
     * - resource: backup-repository, action: read
     * @returns SendObjects_Partial_Unbrand_XoBackupRepository___ Ok
     * @throws ApiError
     */
    public static getRepositories({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoBackupRepository___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup-repositories',
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
     * - resource: backup-repository, action: read
     * @returns Unbrand_XoBackupRepository_ Ok
     * @throws ApiError
     */
    public static getRepository({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoBackupRepository_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backup-repositories/{id}',
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
