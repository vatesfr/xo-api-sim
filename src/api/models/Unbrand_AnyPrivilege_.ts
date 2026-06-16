/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Unbrand_AnyPrivilege_ = ({
    id: string;
    resource: 'acl-privilege';
    action: 'update' | '*' | 'create' | 'delete' | 'read' | 'update:action' | 'update:effect' | 'update:resource' | 'update:selector';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'acl-role';
    action: 'update' | '*' | 'create' | 'delete' | 'read' | 'update:description' | 'update:groups' | 'update:name' | 'update:users';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'alarm';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'backup-archive';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'backup-job';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'backup-log';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'backup-repository';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'group';
    action: 'update' | '*' | 'create' | 'delete' | 'read' | 'update:name' | 'update:users';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'gpuGroup';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'host';
    action: 'export' | 'update' | '*' | 'read' | 'allow-vm' | 'disable' | 'enable' | 'evacuate' | 'export:logs' | 'update:tags';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'message';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'network';
    action: 'update' | '*' | 'create' | 'delete' | 'read' | 'update:tags';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'pbd';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'pci';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'pgpu';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'pif';
    action: 'update' | '*' | 'read' | 'update:management';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'pool';
    action: 'update' | '*' | 'create' | 'read' | 'update:tags' | 'create:network' | 'create:vm' | 'emergency-shutdown' | 'rolling-reboot' | 'rolling-update';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'proxy';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'restore-log';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'schedule';
    action: '*' | 'read' | 'run';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'server';
    action: '*' | 'create' | 'delete' | 'read' | 'connect' | 'disconnect';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'sm';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'sr';
    action: 'import' | 'update' | '*' | 'delete' | 'read' | 'update:tags' | 'import:vdi' | 'import:vm';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'task';
    action: '*' | 'delete' | 'read' | 'abort';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'user';
    action: 'update' | '*' | 'create' | 'delete' | 'read' | 'update:name' | 'update:password' | 'update:permission' | 'update:preferences';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vbd';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vdi-snapshot';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vdi-unmanaged';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vdi';
    action: 'boot' | 'update' | '*' | 'create' | 'delete' | 'read' | 'update:tags' | 'export-content' | 'import-content';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vgpu';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vgpuType';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vif';
    action: '*' | 'create' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vm-controller';
    action: 'update' | '*' | 'read' | 'update:tags';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vm-snapshot';
    action: 'export' | 'update' | '*' | 'delete' | 'read' | 'update:tags';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vm-template';
    action: 'export' | 'update' | '*' | 'delete' | 'read' | 'update:tags' | 'instantiate';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vm';
    action: 'export' | 'pause' | 'resume' | 'shutdown' | 'snapshot' | 'start' | 'suspend' | 'unpause' | 'update' | '*' | 'delete' | 'read' | 'update:tags' | 'reboot' | 'reboot:clean' | 'reboot:hard' | 'revert-snapshot' | 'shutdown:clean' | 'shutdown:hard' | 'update:affinityHost' | 'update:autoPoweron' | 'update:blockedOperations' | 'update:coresPerSocket' | 'update:cpuCap' | 'update:cpuMask' | 'update:cpuWeight' | 'update:cpus' | 'update:cpusStaticMax' | 'update:creation' | 'update:datasources' | 'update:expNestedHvm' | 'update:hasVendorDevice' | 'update:highAvailability' | 'update:hvmBootFirmware' | 'update:memory' | 'update:memoryMax' | 'update:memoryMin' | 'update:memoryStaticMax' | 'update:nameDescription' | 'update:nameLabel' | 'update:nestedVirt' | 'update:nicType' | 'update:notes' | 'update:PV_args' | 'update:resourceSet' | 'update:secureBoot' | 'update:share' | 'update:startDelay' | 'update:suspendSr' | 'update:uefiMode' | 'update:vga' | 'update:videoram' | 'update:viridian' | 'update:virtualizationMode' | 'update:xenStoreData';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
} | {
    id: string;
    resource: 'vtpm';
    action: '*' | 'read';
    selector?: string;
    effect: 'allow' | 'deny';
    roleId: string;
});

