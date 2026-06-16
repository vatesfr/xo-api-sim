/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Unbrand_CreateVmBody_ = {
    memory?: number;
    name_description?: string;
    name_label: string;
    secureBoot?: boolean;
    clone?: boolean;
    gpuGroup?: string;
    vgpuType?: string;
    cpus?: number;
    autoPoweron?: boolean;
    vifs?: Array<({
        network: string;
        mtu?: number;
        mac?: string;
        ipv6_allowed?: Array<string>;
        ipv4_allowed?: Array<string>;
        device?: string;
    } | {
        device: string;
        destroy: boolean;
    })>;
    copyHostBiosStrings?: boolean;
    hvmBootFirmware?: 'uefi' | 'bios';
    /**
     * template UUID
     */
    template: string;
    affinity?: string;
    vdis?: Array<({
        name_description?: string;
        sr?: string;
        size: number;
        name_label: string;
    } | {
        name_description?: string;
        sr?: string;
        size?: number;
        name_label?: string;
        userdevice: string;
    } | {
        userdervice: string;
        destroy: boolean;
    })>;
    install?: ({
        repository: string;
        method: 'cdrom';
    } | {
        repository: '';
        method: 'network';
    });
    cloud_config?: string;
    network_config?: string;
    boot?: boolean;
    destroy_cloud_config_vdi?: boolean;
    createVtpm?: boolean;
};

