/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_XoGroup___ } from '../models/SendObjects_Partial_Unbrand_XoGroup___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { SendObjects_Partial_Unbrand_XoUser___ } from '../models/SendObjects_Partial_Unbrand_XoUser___';
import type { Unbrand_XoGroup_ } from '../models/Unbrand_XoGroup_';
import type { UpdateGroupRequestBody } from '../models/UpdateGroupRequestBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GroupsService {
    /**
     * Returns all groups that match the following privilege:
     * - resource: group, action: read
     * @returns SendObjects_Partial_Unbrand_XoGroup___ Ok
     * @throws ApiError
     */
    public static getUserGroups({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoGroup___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/groups',
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
     * Returns all groups that match the following privilege:
     * - resource: group, action: read
     * @returns SendObjects_Partial_Unbrand_XoGroup___ Ok
     * @throws ApiError
     */
    public static getGroups({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoGroup___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups',
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
     * - resource: group, action: create
     * @returns any Resource created
     * @throws ApiError
     */
    public static createGroup({
        requestBody,
    }: {
        requestBody: {
            name: string;
        },
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                409: `Resource already exists`,
                422: `Invalid parameters`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: group, action: read
     * @returns Unbrand_XoGroup_ Ok
     * @throws ApiError
     */
    public static getGroup({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoGroup_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups/{id}',
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
     * You cannot patch `synchronized` groups (even with the right privilege)
     *
     * Required privileges:
     * - resource: group, action: update (grants all fields)
     * - resource: group, action: update:name (if name is passed)
     * @returns void
     * @throws ApiError
     */
    public static updateGroup({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateGroupRequestBody,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/groups/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                409: `Resource already exists`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: group, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteGroup({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/groups/{id}',
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
     * You cannot manage users of `synchronized` groups (even with the right privilege)
     *
     * Required privilege:
     * - resource: group, action: update:users
     * @returns void
     * @throws ApiError
     */
    public static removeUserFromGroup({
        id,
        userId,
    }: {
        id: string,
        userId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/groups/{id}/users/{userId}',
            path: {
                'id': id,
                'userId': userId,
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
     * You cannot manage users of `synchronized` groups (even with the right privilege)
     *
     * Required privilege:
     * - resource: group, action: update:users
     * @returns void
     * @throws ApiError
     */
    public static addUserToGroup({
        id,
        userId,
    }: {
        id: string,
        userId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/groups/{id}/users/{userId}',
            path: {
                'id': id,
                'userId': userId,
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
     * Returns all users that match the following privilege:
     * - resource: user, action: read
     * @returns SendObjects_Partial_Unbrand_XoUser___ Ok
     * @throws ApiError
     */
    public static getGroupUsers({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoUser___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups/{id}/users',
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
    public static getGroupTasks({
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
            url: '/groups/{id}/tasks',
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
}
