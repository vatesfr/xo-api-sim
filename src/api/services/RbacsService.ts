/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType__id_string__ } from '../models/CreateActionReturnType__id_string__';
import type { SendObjects_Partial_Unbrand_AnyPrivilege___ } from '../models/SendObjects_Partial_Unbrand_AnyPrivilege___';
import type { SendObjects_Partial_Unbrand_XoAclRole___ } from '../models/SendObjects_Partial_Unbrand_XoAclRole___';
import type { Unbrand_AnyPrivilege_ } from '../models/Unbrand_AnyPrivilege_';
import type { Unbrand_SafeOmit_AnyPrivilege_id__ } from '../models/Unbrand_SafeOmit_AnyPrivilege_id__';
import type { Unbrand_SafeOmit_Partial_AnyPrivilege__id_or_roleId__ } from '../models/Unbrand_SafeOmit_Partial_AnyPrivilege__id_or_roleId__';
import type { Unbrand_XoAclRole_ } from '../models/Unbrand_XoAclRole_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RbacsService {
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
     * Returns all ACL roles that match the following privilege:
     * - resource: acl-role, action: read
     * @returns SendObjects_Partial_Unbrand_XoAclRole___ Ok
     * @throws ApiError
     */
    public static getAclV2Roles({
        fields,
        ndjson,
        filter,
        limit,
    }: {
        fields?: string,
        ndjson?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoAclRole___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/acl-roles',
            query: {
                'fields': fields,
                'ndjson': ndjson,
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
     * - resource: acl-role, action: create
     * @returns any Resource created
     * @throws ApiError
     */
    public static createAclV2Role({
        requestBody,
    }: {
        requestBody: {
            description?: string;
            name: string;
        },
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/acl-roles',
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
     * - resource: acl-role, action: read
     * @returns Unbrand_XoAclRole_ Ok
     * @throws ApiError
     */
    public static getAclV2Role({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoAclRole_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/acl-roles/{id}',
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
     * - resource: acl-role, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteAclV2Role({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/acl-roles/{id}',
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
     * Required privileges:
     * - resource: acl-role, action: update (grants all fields)
     * - resource: acl-role, action: update:name (if name is passed)
     * - resource: acl-role, action: update:description (if description is passed)
     * @returns void
     * @throws ApiError
     */
    public static updateAclV2Role({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            description?: string | null;
            name?: string;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/acl-roles/{id}',
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
                422: `Invalid parameters`,
            },
        });
    }
    /**
     * Copy a role with all its privileges. Possibility to modify the name and description of the copied role.
     *
     * Required privileges:
     * - resource: acl-role, action: create
     * - resource: acl-privilege, action: create (if copied role has privileges)
     * @returns CreateActionReturnType__id_string__ Resource created
     * @returns any Action executed asynchronously
     * @throws ApiError
     */
    public static copyAclV2Role({
        id,
        sync,
        requestBody,
    }: {
        id: string,
        sync?: boolean,
        requestBody?: {
            description?: string;
            name?: string;
        },
    }): CancelablePromise<CreateActionReturnType__id_string__ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/acl-roles/{id}/actions/copy',
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
                403: `Forbidden`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Returns all ACL privileges that match the following privilege:
     * - resource: acl-privilege, action: read
     * @returns SendObjects_Partial_Unbrand_AnyPrivilege___ Ok
     * @throws ApiError
     */
    public static getAclV2RolePrivileges({
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
            url: '/acl-roles/{id}/privileges',
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
     * Attach an ACL V2 role to a group.
     *
     * Required privilege:
     * - resource: acl-role, action: update:groups
     * @returns void
     * @throws ApiError
     */
    public static attachAclV2Group({
        id,
        groupId,
    }: {
        id: string,
        groupId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/acl-roles/{id}/groups/{groupId}',
            path: {
                'id': id,
                'groupId': groupId,
            },
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
     * Detach an ACL V2 role from a group.
     *
     * Required privilege:
     * - resource: acl-role, action: update:groups
     * @returns void
     * @throws ApiError
     */
    public static detachAclV2Group({
        id,
        groupId,
    }: {
        id: string,
        groupId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/acl-roles/{id}/groups/{groupId}',
            path: {
                'id': id,
                'groupId': groupId,
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
     * Attach an ACL V2 role to a user.
     *
     * Required privilege:
     * - resource: acl-role, action: update:users
     * @returns void
     * @throws ApiError
     */
    public static attachAclV2User({
        id,
        userId,
    }: {
        id: string,
        userId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/acl-roles/{id}/users/{userId}',
            path: {
                'id': id,
                'userId': userId,
            },
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
     * Detach an ACL V2 role from a user.
     *
     * Required privilege:
     * - resource: acl-role, action: update:users
     * @returns void
     * @throws ApiError
     */
    public static detachAclV2User({
        id,
        userId,
    }: {
        id: string,
        userId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/acl-roles/{id}/users/{userId}',
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
     * Returns all ACL privileges that match the following privilege:
     * - resource: acl-privilege, action: read
     * @returns SendObjects_Partial_Unbrand_AnyPrivilege___ Ok
     * @throws ApiError
     */
    public static getAclV2Privileges({
        fields,
        ndjson,
        filter,
        limit,
    }: {
        fields?: string,
        ndjson?: boolean,
        filter?: string,
        limit?: number,
    }): CancelablePromise<SendObjects_Partial_Unbrand_AnyPrivilege___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/acl-privileges',
            query: {
                'fields': fields,
                'ndjson': ndjson,
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
     * - resource: acl-privilege, action: create
     * @returns any Resource created
     * @throws ApiError
     */
    public static createAclV2Privilege({
        requestBody,
    }: {
        requestBody: Unbrand_SafeOmit_AnyPrivilege_id__,
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/acl-privileges',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid parameters`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: acl-privilege, action: read
     * @returns Unbrand_AnyPrivilege_ Ok
     * @throws ApiError
     */
    public static getAclV2Privilege({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_AnyPrivilege_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/acl-privileges/{id}',
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
     * - resource: acl-privilege, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteAclV2Privilege({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/acl-privileges/{id}',
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
     * Required privileges:
     * - resource: acl-privilege, action: update (grants all fields)
     * - resource: acl-privilege, action: update:action (if action is passed)
     * - resource: acl-privilege, action: update:resource (if resource is passed)
     * - resource: acl-privilege, action: update:effect (if effect is passed)
     * - resource: acl-privilege, action: update:selector (if selector is passed)
     * @returns void
     * @throws ApiError
     */
    public static updateAclV2Privilege({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: Unbrand_SafeOmit_Partial_AnyPrivilege__id_or_roleId__,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/acl-privileges/{id}',
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
                422: `Invalid parameters`,
            },
        });
    }
}
