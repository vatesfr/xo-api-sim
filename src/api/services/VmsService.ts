/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionReturnType__id_Unbrand_XoVm__91_id_93___ } from '../models/CreateActionReturnType__id_Unbrand_XoVm__91_id_93___';
import type { CreateActionReturnType__id_XenApiVm_at_uuid__ } from '../models/CreateActionReturnType__id_XenApiVm_at_uuid__';
import type { CreateActionReturnType_void_ } from '../models/CreateActionReturnType_void_';
import type { SendObjects_Partial_Unbrand_XoAlarm___ } from '../models/SendObjects_Partial_Unbrand_XoAlarm___';
import type { SendObjects_Partial_Unbrand_XoMessage___ } from '../models/SendObjects_Partial_Unbrand_XoMessage___';
import type { SendObjects_Partial_Unbrand_XoTask___ } from '../models/SendObjects_Partial_Unbrand_XoTask___';
import type { SendObjects_Partial_Unbrand_XoVdi___ } from '../models/SendObjects_Partial_Unbrand_XoVdi___';
import type { SendObjects_Partial_Unbrand_XoVdiSnapshot___ } from '../models/SendObjects_Partial_Unbrand_XoVdiSnapshot___';
import type { SendObjects_Partial_Unbrand_XoVm___ } from '../models/SendObjects_Partial_Unbrand_XoVm___';
import type { SendObjects_Partial_Unbrand_XoVmController___ } from '../models/SendObjects_Partial_Unbrand_XoVmController___';
import type { SendObjects_Partial_Unbrand_XoVmSnapshot___ } from '../models/SendObjects_Partial_Unbrand_XoVmSnapshot___';
import type { SendObjects_Partial_Unbrand_XoVmTemplate___ } from '../models/SendObjects_Partial_Unbrand_XoVmTemplate___';
import type { SendObjects_Partial_UnbrandXoVmBackupJob__ } from '../models/SendObjects_Partial_UnbrandXoVmBackupJob__';
import type { Unbrand_CreateVmBody_ } from '../models/Unbrand_CreateVmBody_';
import type { Unbrand_XoVm_ } from '../models/Unbrand_XoVm_';
import type { Unbrand_XoVmController_ } from '../models/Unbrand_XoVmController_';
import type { Unbrand_XoVmSnapshot_ } from '../models/Unbrand_XoVmSnapshot_';
import type { Unbrand_XoVmTemplate_ } from '../models/Unbrand_XoVmTemplate_';
import type { UnbrandedVmDashboard } from '../models/UnbrandedVmDashboard';
import type { UpdateVmRequestBody } from '../models/UpdateVmRequestBody';
import type { XapiStatsGranularity } from '../models/XapiStatsGranularity';
import type { XapiStatsResponse_XapiVmStatsRaw_ } from '../models/XapiStatsResponse_XapiVmStatsRaw_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VmsService {
    /**
     * Returns all VMs that match the following privilege:
     * - resource: vm, action: read
     * @returns SendObjects_Partial_Unbrand_XoVm___ Ok
     * @throws ApiError
     */
    public static getVms({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVm___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms',
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
     *
     * Export VM. Compress is only used for XVA format
     *
     * Required privilege:
     * - resource: vm, action: export
     * @returns string Download started
     * @throws ApiError
     */
    public static exportVm({
        id,
        format,
        compress,
    }: {
        id: string,
        format: 'xva' | 'ova',
        compress?: boolean,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}.{format}',
            path: {
                'id': id,
                'format': format,
            },
            query: {
                'compress': compress,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid format, Invalid compress`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vm, action: read
     * @returns Unbrand_XoVm_ Ok
     * @throws ApiError
     */
    public static getVm({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoVm_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}',
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
     * Partial update of a VM. Only the fields present in the body are modified;
     * everything else is left untouched.
     *
     * Operations are applied sequentially: if one fails, previously applied
     * changes are not rolled back.
     *
     * Required privilege per field provided in the body:
     * - resource: vm, action: update:&lt;field&gt; (e.g. update:nameLabel, update:cpus, ...)
     *
     * Special fields:
     * - `xenStoreData` keys are automatically prefixed with `vm-data/` when missing
     * @returns void
     * @throws ApiError
     */
    public static updateVm({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateVmRequestBody,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/vms/{id}',
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
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vm, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteVm({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vms/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                409: `Incorrect state`,
            },
        });
    }
    /**
     *
     * VM must be running
     *
     * Required privilege:
     * - resource: vm, action: read
     * @returns XapiStatsResponse_XapiVmStatsRaw_ Ok
     * @throws ApiError
     */
    public static getVmStats({
        id,
        granularity,
    }: {
        id: string,
        granularity?: XapiStatsGranularity,
    }): CancelablePromise<XapiStatsResponse_XapiVmStatsRaw_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}/stats',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid granularity, VM is halted or host could not be found`,
            },
        });
    }
    /**
     * The VM must be running
     *
     * List of possible data_source (Based on [Xenserver doc](https://docs.xenserver.com/en-us/xenserver/8/monitor-performance#available-vm-metrics))
     * - **cpu#** : Utilization of vCPU cpu (fraction). Enabled by default. *Condition*: vCPU cpu exists.
     * - **cpu_usage** : Domain CPU usage. *Condition*: None.
     * - **memory** : Memory currently allocated to VM (Bytes). Enabled by default. *Condition*: None.
     * - **memory_target** : Target of VM balloon driver (Bytes). Enabled by default. *Condition*: None.
     * - **memory_internal_free** : Memory used as reported by the guest agent (KiB). Enabled by default. *Condition*: None.
     * - **runstate_fullrun** : Fraction of time that all vCPUs are running. *Condition*: None.
     * - **runstate_full_contention** : Fraction of time that all vCPUs are runnable (waiting for CPU). *Condition*: None.
     * - **runstate_concurrency_hazard** : Fraction of time that some vCPUs are running and some are runnable. *Condition*: None.
     * - **runstate_blocked** : Fraction of time that all vCPUs are blocked or offline. *Condition*: None.
     * - **runstate_partial_run** : Fraction of time that some vCPUs are running, and some are blocked. *Condition*: None.
     * - **runstate_partial_contention** : Fraction of time that some vCPUs are runnable and some are blocked. *Condition*: None.
     * - **vbd_#_write** : Writes to device vbd in bytes per second. Enabled by default. *Condition*: VBD vbd exists.
     * - **vbd_#_read** : Reads from device vbd in bytes per second. Enabled by default. *Condition*: VBD vbd exists.
     * - **vbd_#_write_latency** : Writes to device vbd in microseconds. *Condition*: VBD vbd exists.
     * - **vbd_#_read_latency** : Reads from device vbd in microseconds. *Condition*: VBD vbd exists.
     * - **vbd_#_iops_read** : Read requests per second. *Condition*: At least one plugged VBD for non-ISO VDI on the host.
     * - **vbd_#_iops_write** : Write requests per second. *Condition*: At least one plugged VBD for non-ISO VDI on the host.
     * - **vbd_#_iops_total** : I/O requests per second. *Condition*: At least one plugged VBD for non-ISO VDI on the host.
     * - **vbd_#_iowait** : Percentage of time waiting for I/O. *Condition*: At least one plugged VBD for non-ISO VDI on the host.
     * - **vbd_#_inflight** : Number of I/O requests currently in flight. *Condition*: At least one plugged VBD for non-ISO VDI on the host.
     * - **vbd_#_avgqu_sz** : Average I/O queue size. *Condition*: At least one plugged VBD for non-ISO VDI on the host.
     * - **vif_#_rx** : Bytes per second received on virtual interface number vif. Enabled by default. *Condition*: VIF vif exists.
     * - **vif_#_tx** : Bytes per second transmitted on virtual interface vif. Enabled by default. *Condition*: VIF vif exists.
     * - **vif_#_rx_errors** : Receive errors per second on virtual interface vif. Enabled by default. *Condition*: VIF vif exists.
     * - **vif_#_tx_errors** : Transmit errors per second on virtual interface vif. Enabled by default. *Condition*: VIF vif exists.
     *
     * Required privilege:
     * - resource: vm, action: update:datasources
     * @returns void
     * @throws ApiError
     */
    public static addDataSource({
        id,
        dataSource,
    }: {
        id: string,
        dataSource: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vms/{id}/stats/data_source/{data_source}',
            path: {
                'id': id,
                'data_source': dataSource,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * The VM must be running
     *
     * For a list of possible data sources, see the endpoint documentation: `GET {id}/stats/data_source/{data_source}`
     *
     * Required privilege:
     * - resource: vm, action: update:datasources
     * @returns void
     * @throws ApiError
     */
    public static deleteDataSource({
        id,
        dataSource,
    }: {
        id: string,
        dataSource: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vms/{id}/stats/data_source/{data_source}',
            path: {
                'id': id,
                'data_source': dataSource,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * The VM must be halted
     *
     * Required privileges:
     * - resource: vm, action: start
     * - resource: host, action: allow-vm (if an hostId is specified)
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static startVm({
        id,
        sync,
        requestBody,
    }: {
        id: string,
        sync?: boolean,
        requestBody?: {
            hostId?: string;
        },
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/start',
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
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Requires guest tools to be installed
     *
     * Required privilege:
     * - resource: vm, action: shutdown:clean
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static cleanShutdownVm({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/clean_shutdown',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Requires guest tools to be installed
     *
     * Required privilege:
     * - resource: vm, action: reboot:clean
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static cleanRebootVm({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/clean_reboot',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
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
     * - resource: vm, action: shutdown:hard
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static hardShutdownVm({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/hard_shutdown',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vm, action: reboot:hard
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static hardRebootVm({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/hard_reboot',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * The VM must be running
     *
     * Required privilege:
     * - resource: vm, action: pause
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static pauseVm({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/pause',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * The VM must be running
     *
     * Required privilege:
     * - resource: vm, action: suspend
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static suspendVm({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/suspend',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * The VM must be suspended
     *
     * Required privilege:
     * - resource: vm, action: resume
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static resumeVm({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/resume',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * The VM must be paused
     *
     * Required privilege:
     * - resource: vm, action: unpause
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static unpauseVm({
        id,
        sync,
    }: {
        id: string,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/unpause',
            path: {
                'id': id,
            },
            query: {
                'sync': sync,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vm, action: revert-snapshot
     * - resource: vm, action: snapshot (if `snapshotBefore: true`)
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static revertSnapshotVm({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: {
            snapshotBefore?: boolean;
            snapshotId: string;
        },
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/revert_snapshot',
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
                422: `Invalid parameters`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vm, action: snapshot
     * @returns any Snapshot created
     * @returns CreateActionReturnType__id_XenApiVm_at_uuid__ Action executed asynchronously
     * @throws ApiError
     */
    public static snapshotVm({
        id,
        sync,
        requestBody,
    }: {
        id: string,
        sync?: boolean,
        requestBody?: {
            name_label?: string;
        },
    }): CancelablePromise<any | CreateActionReturnType__id_XenApiVm_at_uuid__> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/snapshot',
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
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     *
     * - For fast clone on the same SR, omit `srId` and set `fast` to `true`.
     * - For full copy on the same SR, omit `srId` and set `fast` to `false`.
     * - To copy the VM to a different SR (always a full copy), provide `srId`. Supports cross-pool copy. Optionally use `compress: "gzip"` or `compress: "zstd"` to compress the export stream during cross-pool copy.
     * @returns any Resource created
     * @returns CreateActionReturnType__id_XenApiVm_at_uuid__ Action executed asynchronously
     * @throws ApiError
     */
    public static cloneVm({
        id,
        sync,
        requestBody,
    }: {
        id: string,
        sync?: boolean,
        requestBody?: ({
            fast?: boolean;
            name_label?: string;
        } | {
            compress?: 'gzip' | 'zstd';
            srId?: string;
            name_label?: string;
        }),
    }): CancelablePromise<any | CreateActionReturnType__id_XenApiVm_at_uuid__> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/clone',
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
                404: `Resource not found`,
                422: `Invalid parameters`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Returns all alarms that match the following privilege:
     * - resource: alarm, action: read
     * @returns SendObjects_Partial_Unbrand_XoAlarm___ Ok
     * @throws ApiError
     */
    public static getVmAlarms({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoAlarm___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}/alarms',
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
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdi___ Ok
     * @throws ApiError
     */
    public static getVmVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdi___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}/vdis',
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
     * Returns all backup jobs that match the following privilege:
     * - resource: backup-job, action: read
     * @returns SendObjects_Partial_UnbrandXoVmBackupJob__ Ok
     * @throws ApiError
     */
    public static vmGetVmBackupJobs({
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
    }): CancelablePromise<SendObjects_Partial_UnbrandXoVmBackupJob__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}/backup-jobs',
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
     * Returns all messages that match the following privilege:
     * - resource: message, action: read
     * @returns SendObjects_Partial_Unbrand_XoMessage___ Ok
     * @throws ApiError
     */
    public static getVmMessages({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoMessage___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}/messages',
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
     * Returns all tasks that match the following privilege:
     * - resource: task, action: read
     * @returns SendObjects_Partial_Unbrand_XoTask___ Ok
     * @throws ApiError
     */
    public static getVmTasks({
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
            url: '/vms/{id}/tasks',
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
     * Required privilege:
     * - resource: vm, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putVmTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vms/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * - resource: vm, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deleteVmTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vms/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * - resource: vm, action: read
     * @returns UnbrandedVmDashboard Ok
     * @throws ApiError
     */
    public static getVmDashboard({
        id,
        ndjson,
    }: {
        id: string,
        ndjson?: boolean,
    }): CancelablePromise<UnbrandedVmDashboard> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vms/{id}/dashboard',
            path: {
                'id': id,
            },
            query: {
                'ndjson': ndjson,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * VIF mapping is not allowed for intra-pool migration
     *
     * Networks and SRs must belong to the same pool as the destination host
     * @returns CreateActionReturnType_void_ Action executed asynchronously
     * @throws ApiError
     */
    public static migrateVm({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: ({
            migrationNetworkId?: string;
            hostId: string;
        } | {
            networkIdByVifId?: Record<string, string>;
            srIdByVdiId?: Record<string, string>;
            srId?: string;
            migrationNetworkId?: string;
            hostId: string;
        }),
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType_void_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vms/{id}/actions/migrate',
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
                404: `Resource not found`,
                422: `Invalid parameters`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Returns all VM templates that match the following privilege:
     * - resource: vm-template, action: read
     * @returns SendObjects_Partial_Unbrand_XoVmTemplate___ Ok
     * @throws ApiError
     */
    public static getVmTemplates({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVmTemplate___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-templates',
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
     *
     * Export VM-template. Compress is only used for XVA format
     *
     * Required privilege:
     * - resource: vm-template, action: export
     * @returns string Download started
     * @throws ApiError
     */
    public static exportVmTemplate({
        id,
        format,
        compress,
    }: {
        id: string,
        format: 'xva' | 'ova',
        compress?: boolean,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-templates/{id}.{format}',
            path: {
                'id': id,
                'format': format,
            },
            query: {
                'compress': compress,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid format, Invalid compress`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vm-template, action: read
     * @returns Unbrand_XoVmTemplate_ Ok
     * @throws ApiError
     */
    public static getVmTemplate({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoVmTemplate_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-templates/{id}',
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
     * - resource: vm-template, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteVmTemplate({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vm-templates/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                409: `Incorrect state`,
            },
        });
    }
    /**
     * Returns all alarms that match the following privilege:
     * - resource: alarm, action: read
     * @returns SendObjects_Partial_Unbrand_XoAlarm___ Ok
     * @throws ApiError
     */
    public static getVmTemplateAlarms({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoAlarm___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-templates/{id}/alarms',
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
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdi___ Ok
     * @throws ApiError
     */
    public static getVmTemplateVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdi___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-templates/{id}/vdis',
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
     * Returns all messages that match the following privilege:
     * - resource: message, action: read
     * @returns SendObjects_Partial_Unbrand_XoMessage___ Ok
     * @throws ApiError
     */
    public static getVmTemplateMessages({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoMessage___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-templates/{id}/messages',
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
     * Returns all tasks that match the following privilege:
     * - resource: task, action: read
     * @returns SendObjects_Partial_Unbrand_XoTask___ Ok
     * @throws ApiError
     */
    public static getVmTemplateTasks({
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
            url: '/vm-templates/{id}/tasks',
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
     * Required privilege:
     * - resource: vm-template, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putVmTemplateTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vm-templates/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * - resource: vm-template, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deleteVmTemplateTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vm-templates/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * Returns all VM snapshots that match the following privilege:
     * - resource: vm-snapshot, action: read
     * @returns SendObjects_Partial_Unbrand_XoVmSnapshot___ Ok
     * @throws ApiError
     */
    public static getVmSnapshots({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVmSnapshot___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-snapshots',
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
     *
     * Export VM-snapshot. Compress is only used for XVA format
     *
     * Required privilege:
     * - resource: vm-snapshot, action: export
     * @returns string Download started
     * @throws ApiError
     */
    public static exportVmSnapshot({
        id,
        format,
        compress,
    }: {
        id: string,
        format: 'xva' | 'ova',
        compress?: boolean,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-snapshots/{id}.{format}',
            path: {
                'id': id,
                'format': format,
            },
            query: {
                'compress': compress,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                422: `Invalid format, Invalid compress`,
            },
        });
    }
    /**
     * Required privilege:
     * - resource: vm-snapshot, action: read
     * @returns Unbrand_XoVmSnapshot_ Ok
     * @throws ApiError
     */
    public static getVmSnapshot({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoVmSnapshot_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-snapshots/{id}',
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
     * - resource: vm-snapshot, action: delete
     * @returns void
     * @throws ApiError
     */
    public static deleteVmSnapshot({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vm-snapshots/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                409: `Incorrect state`,
            },
        });
    }
    /**
     * Returns all alarms that match the following privilege:
     * - resource: alarm, action: read
     * @returns SendObjects_Partial_Unbrand_XoAlarm___ Ok
     * @throws ApiError
     */
    public static getVmSnapshotAlarms({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoAlarm___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-snapshots/{id}/alarms',
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
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdiSnapshot___ Ok
     * @throws ApiError
     */
    public static getVmSnapshotVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdiSnapshot___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-snapshots/{id}/vdis',
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
     * Returns all messages that match the following privilege:
     * - resource: message, action: read
     * @returns SendObjects_Partial_Unbrand_XoMessage___ Ok
     * @throws ApiError
     */
    public static getVmSnapshotsMessages({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoMessage___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-snapshots/{id}/messages',
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
     * Returns all tasks that match the following privilege:
     * - resource: task, action: read
     * @returns SendObjects_Partial_Unbrand_XoTask___ Ok
     * @throws ApiError
     */
    public static getVmSnapshotTasks({
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
            url: '/vm-snapshots/{id}/tasks',
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
     * Required privilege:
     * - resource: vm-snapshot, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putVmSnapshotTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vm-snapshots/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * - resource: vm-snapshot, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deleteVmSnapshotTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vm-snapshots/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * Returns all VM controllers that match the following privilege:
     * - resource: vm-controller, action: read
     * @returns SendObjects_Partial_Unbrand_XoVmController___ Ok
     * @throws ApiError
     */
    public static getVmControllers({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVmController___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-controllers',
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
     * - resource: vm-controller, action: read
     * @returns Unbrand_XoVmController_ Ok
     * @throws ApiError
     */
    public static getVmController({
        id,
    }: {
        id: string,
    }): CancelablePromise<Unbrand_XoVmController_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-controllers/{id}',
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
     * Returns all alarms that match the following privilege:
     * - resource: alarm, action: read
     * @returns SendObjects_Partial_Unbrand_XoAlarm___ Ok
     * @throws ApiError
     */
    public static getVmControllerAlarms({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoAlarm___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-controllers/{id}/alarms',
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
     * Returns all VDIs that match the following privilege:
     * - resource: vdi, action: read
     * @returns SendObjects_Partial_Unbrand_XoVdi___ Ok
     * @throws ApiError
     */
    public static getVmControllerVdis({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoVdi___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-controllers/{id}/vdis',
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
     * Returns all messages that match the following privilege:
     * - resource: message, action: read
     * @returns SendObjects_Partial_Unbrand_XoMessage___ Ok
     * @throws ApiError
     */
    public static getVmControllerMessages({
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
    }): CancelablePromise<SendObjects_Partial_Unbrand_XoMessage___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vm-controllers/{id}/messages',
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
     * Returns all tasks that match the following privilege:
     * - resource: task, action: read
     * @returns SendObjects_Partial_Unbrand_XoTask___ Ok
     * @throws ApiError
     */
    public static getVmControllerTasks({
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
            url: '/vm-controllers/{id}/tasks',
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
     * Required privilege:
     * - resource: vm-controller, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static putVmControllerTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vm-controllers/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * - resource: vm-controller, action: update:tags
     * @returns void
     * @throws ApiError
     */
    public static deleteVmControllerTag({
        id,
        tag,
    }: {
        id: string,
        tag: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vm-controllers/{id}/tags/{tag}',
            path: {
                'id': id,
                'tag': tag,
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
     * - resource: pool, action: create:vm
     * - resource: vm-template, action: instantiate
     * - resource: vdi, action: create (if vdis is passed)
     * - resource: vdi, action: boot (if install.repository is passed)
     * - resource: vif, action: create (if vifs is passed)
     * - resource: host, action: allow-vm (if affinity is passed)
     * @returns CreateActionReturnType__id_Unbrand_XoVm__91_id_93___ Resource created
     * @returns any Action executed asynchronously
     * @throws ApiError
     */
    public static createVm({
        id,
        requestBody,
        sync,
    }: {
        id: string,
        requestBody: Unbrand_CreateVmBody_,
        sync?: boolean,
    }): CancelablePromise<CreateActionReturnType__id_Unbrand_XoVm__91_id_93___ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/actions/create_vm',
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
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
    /**
     * Import an XVA VM into a pool
     *
     * Required privilege:
     * - resource: sr, action: import:vm
     * @returns any VM imported
     * @throws ApiError
     */
    public static importVm({
        id,
        requestBody,
        sr,
    }: {
        id: string,
        requestBody: ,
        sr?: string,
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pools/{id}/vms',
            path: {
                'id': id,
            },
            query: {
                'sr': sr,
            },
            body: requestBody,
            mediaType: 'application/octet-stream',
            errors: {
                400: `Bad request`,
                401: `Authentication required`,
                403: `Forbidden`,
                404: `Resource not found`,
                500: `Internal server error, XenServer/XCP-ng error`,
            },
        });
    }
}
