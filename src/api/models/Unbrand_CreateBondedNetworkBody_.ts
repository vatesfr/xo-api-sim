/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BOND_MODE } from './BOND_MODE';
export type Unbrand_CreateBondedNetworkBody_ = {
    name: string;
    description?: string;
    mtu?: number;
    nbd?: boolean;
    pifIds: Array<string>;
    bondMode: BOND_MODE;
};

