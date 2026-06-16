/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Record_string_string_ } from './Record_string_string_';
export type Unbrand_XoUser_ = {
    authProviders?: Record_string_string_;
    email: string;
    groups: Array<string>;
    id: string;
    name?: string;
    permission: 'none' | 'admin';
    pw_hash?: string;
    preferences: Record_string_string_;
};

