/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocsService {
    /**
     * Returns the swagger json ready to use for REST API clients
     * @returns any Ok
     * @throws ApiError
     */
    public static swaggerSpec(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/docs/swagger.json',
        });
    }
}
