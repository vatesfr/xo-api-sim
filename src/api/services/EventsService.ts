/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { XoListenerType } from '../models/XoListenerType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventsService {
    /**
     * Opens an SSE (Server-Sent Events) connection.
     *
     * By default, there are no active subscriptions in the stream.
     * To add subscriptions, use the following endpoint:
     *
     * POST /rest/v0/events/:id/subscriptions
     *
     *
     * Events you will receive:
     * - **init**: The first event you will receive.
     * Data: the connection ID.
     *
     * - **ping**: A simple event used to keep the connection alive between the server and the client.
     * Data: the event timestamp.
     *
     * - **add**: Triggered when an object has been added.
     * Data: the added object.
     *
     * - **update**: Triggered when an object has been updated.
     * Data: the updated object.
     *
     * - **remove**: Triggered when an object has been removed.
     * Data: the removed object.
     * @returns any OK
     * @throws ApiError
     */
    public static openSseConnection(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
            },
        });
    }
    /**
     * Add a subscription
     * @returns any Resource created
     * @throws ApiError
     */
    public static addSubscription({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            fields?: (Array<string> | '*');
            collection: XoListenerType;
        },
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{id}/subscriptions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Remove a subscription
     * @returns void
     * @throws ApiError
     */
    public static removeSubscription({
        id,
        subscriptionId,
    }: {
        id: string,
        subscriptionId: XoListenerType,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{id}/subscriptions/{subscriptionId}',
            path: {
                'id': id,
                'subscriptionId': subscriptionId,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                404: `Resource not found`,
            },
        });
    }
}
