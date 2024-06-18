/**
 * Enum to assign available permissions
 */
export enum PermissionsEnums {
    RolesAllPrivilege = '0-0',
    RolesViewPrivilege = '0-0-0',
    RolesAllActionPrivilege = '0-0-1',
    RolesAddPrivilege = '0-0-1-0',
    RolesEditPrivilege = '0-0-1-1',
    RolesDeletePrivilege = '0-0-1-2',
    RolesCofigurePrivilege = '0-0-1-3',
    StaffsAllPrivilege = '0-1',
    StaffsViewPrivilege = '0-1-0',
    StaffsAllActionPrivilege = '0-1-1',
    StaffsAddPrivilege = '0-1-1-0',
    StaffsEditPrivilege = '0-1-1-1',
    StaffsDeletePrivilege = '0-1-1-2',
    AuditReportViewPrivilege = '0-2'
}