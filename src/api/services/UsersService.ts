/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendObjects_Partial_Unbrand_AnyPrivilege___ } from '../models/SendObjects_Partial_Unbrand_AnyPrivilege___';
import type { SendObjects_Partial_Unbrand_XoGroup___ } from '../models/SendObjects_Partial_Unbrand_XoGroup___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { SendObjects_Partial_Unbrand_XoUser___ } from '../models/SendObjects_Partial_Unbrand_XoUser___';
import type { Unbrand_XoAuthenticationToken_ } from '../models/Unbrand_XoAuthenticationToken_';
import type { Unbrand_XoUser_ } from '../models/Unbrand_XoUser_';
import type { UpdateUserRequestBody } from '../models/UpdateUserRequestBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Returns all users that match the following privilege:
     * - resource: user, action: read
     * @returns SendObjects_Partial_Unbrand_XoUser___ Ok
     * @throws ApiError
     */
    public static getUsers({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoUser___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
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
     * - resource: user, action: create
     * @returns any Resource created
     * @throws ApiError
     */
    public static createUser({
        requestBody,
    }: {
        requestBody: {
            permission?: 'none' | 'admin';
            password: string;
            name: string;
        },
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                422: `Invalid parameters`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: user, action: read (if not self)
     * @returns Unbrand_XoUser_ Ok
     * @throws ApiError
     */
    public static getUser({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoUser_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
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
     * You cannot change your own `permission` (even with the right privilege)
     *
     * Required privileges:
     * - resource: user, action: update (grants all fields)
     * - resource: user, action: update:name (if name is passed)
     * - resource: user, action: update:password (if password is passed)
     * - resource: user, action: update:permission (if permission is passed)
     * - resource: user, action: update:preferences (if preferences is passed)
     * @returns void
     * @throws ApiError
     */
    public static updateUser({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateUserRequestBody,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}',
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
     * - resource: user, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteUser({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}',
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
     * You can only see your own authentication tokens
     * @returns Unbrand_XoAuthenticationToken_ Ok
     * @throws ApiError
     */
    public static getAuthenticationTokens({
        id,
        filter,
        limit,
    }: {
        id: string,
        filter?: string,
        limit?: number,
    }): CancelablePromise<Array<Unbrand_XoAuthenticationToken_>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/authentication_tokens',
            path: {
                'id': id,
            },
            query: {
                'filter': filter,
                'limit': limit,
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
     * You can only create authentication token for yourself
     * @returns any Resource created
     * @throws ApiError
     */
    public static postAuthenticationTokens({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            expiresIn?: (string | number);
            description?: string;
            client?: {
                id?: string;
            };
        },
    }): CancelablePromise<{
        token: Unbrand_XoAuthenticationToken_;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}/authentication_tokens',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Returns all tasks that match the following privilege:
     * - resource: task, action: read
     * @returns SendObjects_Partial_Unbrand_XoTask___ Ok
     * @throws ApiError
     */
    public static getUserTasks({
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
            url: '/users/{id}/tasks',
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
     * @deprecated
     * @returns any Resource created
     * @throws ApiError
     */
    public static postDeprecatedAuthenticationTokens({
        requestBody,
    }: {
        requestBody: {
            expiresIn?: (string | number);
            description?: string;
            client?: {
                id?: string;
            };
        },
    }): CancelablePromise<{
        token: Unbrand_XoAuthenticationToken_;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/authentication_tokens',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Returns all ACL privileges that match the following privilege:
     * - resource: acl-privilege, action: read (if not self)
     * @returns SendObjects_Partial_Unbrand_AnyPrivilege___ Ok
     * @throws ApiError
     */
    public static getUserPrivileges({
        id,
        fields,
        ndjson,
        filter,
        limit,
    }: {
        id: string,
        fields?: string,
        ndjson?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_AnyPrivilege___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/acl-privileges',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'ndjson': ndjson,
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
}
