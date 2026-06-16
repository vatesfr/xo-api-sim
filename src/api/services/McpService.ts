/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { McpStatus } from '../models/McpStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class McpService {
    /**
     * Returns whether MCP is currently enabled on this XO server.
     *
     * The route is publicly reachable (no authentication required) so the
     * `@xen-orchestra/mcp` binary can check the kill-switch at startup,
     * before any credentials have been configured.
     * @returns McpStatus MCP is enabled
     * @throws ApiError
     */
    public static getMcpStatus(): CancelablePromise<McpStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/mcp/status',
            errors: {
                503: `MCP is disabled by administrator`,
            },
        });
    }
}
