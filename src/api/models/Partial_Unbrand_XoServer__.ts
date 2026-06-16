/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_unknown_ } from './Record_string_unknown_';
/**
 * Make all properties in T optional
 */
export type Partial_Unbrand_XoServer__ = {
    allowUnauthorized?: boolean;
    enabled?: boolean;
    error?: Record_string_unknown_;
    host?: string;
    httpProxy?: string;
    id?: string;
    label?: string;
    master?: string;
    poolId?: string;
    poolNameDescription?: string;
    poolNameLabel?: string;
    readOnly?: boolean;
    status?: 'connected' | 'disconnected' | 'connecting';
    username?: string;
};

