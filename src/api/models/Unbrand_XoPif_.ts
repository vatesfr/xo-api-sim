/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Branded_PIF_ } from './Branded_PIF_';
import type { IP_CONFIGURATION_MODE } from './IP_CONFIGURATION_MODE';
import type { IPV6_CONFIGURATION_MODE } from './IPV6_CONFIGURATION_MODE';
import type { PRIMARY_ADDRESS_TYPE } from './PRIMARY_ADDRESS_TYPE';
export type Unbrand_XoPif_ = {
    $pool: string;
    /**
     * @deprecated
     */
    $poolId: string;
    _xapiRef: string;
    uuid: string;
    $host: string;
    $network: string;
    attached: boolean;
    bondMaster?: string;
    bondSlaves?: Array<Branded_PIF_>;
    carrier: boolean;
    device: string;
    deviceName?: string;
    disallowUnplug: boolean;
    dns: string;
    gateway: string;
    id: string;
    ip: string;
    ipv6: Array<string>;
    ipv6Mode: IPV6_CONFIGURATION_MODE;
    isBondMaster: boolean;
    isBondSlave: boolean;
    mac: string;
    management: boolean;
    mode: IP_CONFIGURATION_MODE;
    mtu: number;
    netmask: string;
    physical: boolean;
    primaryAddressType: PRIMARY_ADDRESS_TYPE;
    speed?: number;
    type: 'PIF';
    vlan: number;
};

