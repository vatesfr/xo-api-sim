/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DOMAIN_TYPE } from './DOMAIN_TYPE';
import type { Record_string_string_ } from './Record_string_string_';
import type { Record_string_VM_OPERATIONS_ } from './Record_string_VM_OPERATIONS_';
import type { Record_VM_OPERATIONS_string_ } from './Record_VM_OPERATIONS_string_';
import type { VM_POWER_STATE } from './VM_POWER_STATE';
/**
 * Make all properties in T optional
 */
export type Partial_Unbrand_XoVmSnapshot__ = {
    $pool?: string;
    /**
     * @deprecated
     */
    $poolId?: string;
    _xapiRef?: string;
    uuid?: string;
    $VBDs?: Array<string>;
    $VGPUs?: Array<string>;
    $container?: string;
    CPUs?: {
        number: number;
        max: number;
    };
    PV_args?: string;
    VGPUs?: Array<string>;
    VIFs?: Array<string>;
    VTPMs?: Array<string>;
    addresses?: Record_string_string_;
    affinityHost?: string;
    attachedPcis?: Array<string>;
    auto_poweron?: boolean;
    bios_strings?: Record_string_string_;
    blockedOperations?: Record_VM_OPERATIONS_string_;
    boot?: Record_string_string_;
    coresPerSocket?: number;
    cpuCap?: number;
    cpuMask?: Array<number>;
    cpuWeight?: number;
    creation?: Record_string_string_;
    current_operations?: Record_string_VM_OPERATIONS_;
    docker?: {
        version?: string;
        process?: string;
        info?: string;
        enabled: boolean;
        containers?: Array<string>;
    };
    /**
     * @deprecated
     */
    expNestedHvm?: boolean;
    isNestedVirtEnabled?: boolean;
    hasVendorDevice?: boolean;
    high_availability?: string;
    installTime?: number | null;
    isFirmwareSupported?: boolean;
    memory?: {
        usage?: number;
        static: Array<number>;
        size: number;
        dynamic: Array<number>;
    };
    mainIpAddress?: string;
    managementAgentDetected?: boolean;
    name_description?: string;
    name_label?: string;
    needsVtpm?: boolean;
    nicType?: string;
    notes?: string;
    os_version?: Record_string_string_ | null;
    other?: Record_string_string_;
    parent?: string;
    power_state?: VM_POWER_STATE;
    pvDriversDetected?: boolean;
    pvDriversUpToDate?: boolean;
    pvDriversVersion?: string;
    resourceSet?: string;
    secureBoot?: boolean;
    snapshots?: Array<string>;
    startDelay?: number;
    startTime?: number | null;
    suspendSr?: string;
    tags?: Array<string>;
    vga?: string;
    /**
     * Value in MiB.
     * See: https://wiki.xenproject.org/wiki/XCP_PV_templates_start
     */
    videoram?: number;
    viridian?: boolean;
    virtualizationMode?: DOMAIN_TYPE;
    xenStoreData?: Record_string_string_;
    /**
     * @deprecated
     */
    xentools?: ({
        version: string | null;
        minor: number | null;
        major: number | null;
    } | boolean);
    $snapshot_of?: string;
    id?: string;
    snapshot_time?: number;
    suspendVdi?: string;
    type?: 'VM-snapshot';
};

