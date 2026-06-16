/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_string_ } from './Record_string_string_';
/**
 * Make all properties in T optional
 */
export type Partial_Unbrand_XoUser__ = {
    authProviders?: Record_string_string_;
    email?: string;
    groups?: Array<string>;
    id?: string;
    name?: string;
    permission?: 'none' | 'admin';
    pw_hash?: string;
    preferences?: Record_string_string_;
};

