/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Partial_Record_VM_OPERATIONS_boolean_or_string_or_null__ } from './Partial_Record_VM_OPERATIONS_boolean_or_string_or_null__';
import type { Record_string_string_or_null_ } from './Record_string_string_or_null_';
/**
 * Body of `PATCH /vms/{id}`.
 *
 * Extends {@link EditVmProps} with two REST-only properties that the xo-server
 * resource-set mixin handles outside of `editVm`.
 */
export type UpdateVmRequestBody = {
    affinityHost?: string | null;
    autoPoweron?: boolean;
    blockedOperations?: Partial_Record_VM_OPERATIONS_boolean_or_string_or_null__;
    coresPerSocket?: (number | string) | null;
    cpuCap?: number | null;
    cpuMask?: Array<number>;
    cpuWeight?: number | null;
    cpus?: number;
    cpusStaticMax?: (number | string);
    /**
     * Update VM creation metadata stored under `other_config.xo:*`. The object is
     * merged with the existing data.
     */
    creation?: {
        user?: string;
    };
    expNestedHvm?: boolean;
    hasVendorDevice?: boolean;
    highAvailability?: 'best-effort' | 'restart' | '';
    hvmBootFirmware?: string | null;
    memory?: (number | string);
    memoryMax?: (number | string);
    memoryMin?: (number | string);
    memoryStaticMax?: (number | string);
    nameDescription?: string;
    nameLabel?: string;
    nestedVirt?: boolean;
    nicType?: string | null;
    notes?: string | null;
    PV_args?: string;
    secureBoot?: boolean;
    startDelay?: number;
    suspendSr?: string | null;
    tags?: Array<string>;
    uefiMode?: 'setup' | 'user';
    vga?: 'std' | 'cirrus';
    videoram?: 1 | 2 | 4 | 8 | 16;
    viridian?: boolean;
    virtualizationMode?: 'pv' | 'hvm';
    xenStoreData?: Record_string_string_or_null_;
    /**
     * Moves the VM in/out of a resource set.
     */
    resourceSet?: string | null;
    /**
     * When `true` and the VM is in a resource set, share the VM with all members
     * of that resource set. `false` is a no-op.
     */
    share?: boolean;
};

