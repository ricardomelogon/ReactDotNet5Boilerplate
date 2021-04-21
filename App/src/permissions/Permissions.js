const Permission = {
  Locked: 0,
  SystemAdmin: 1,
  Client: 2,
  Administrator: 3,
  AccessAll: 65535,
};

const getPermissionName = (value) => {
  return Object.keys(Permission).find(key => Permission[key] === value);
};

const getUserPermissions = (string) => {
  return string.split('').map(c => c.charCodeAt(0));
};

const userHasPermission = (userPermissions, permissionToCheck) => {
  try {
    let perms;
    if (Array.isArray(userPermissions)) perms = userPermissions;
    else perms = getUserPermissions(userPermissions);
    for (let i = 0; i < perms.length; i++) {
      if (perms[i] === permissionToCheck || perms[i] === Permission.AccessAll) return true;
    }
    return false;
  }
  catch {
    return false;
  }
};

const userHasAllPermissions = (userPermissions, permissionsToCheck) => {
  try {
    let perms;
    if (Array.isArray(userPermissions)) perms = userPermissions;
    else perms = getUserPermissions(userPermissions);
    if (perms.includes(Permission.AccessAll)) return true;
    if (permissionsToCheck.every(c => perms.includes(c))) return true;
    return false;
  }
  catch {
    return false;
  }
};

const userHasAnyPermissions = (userPermissions, permissionsToCheck) => {
  try {
    let perms;
    if (Array.isArray(userPermissions)) perms = userPermissions;
    else perms = getUserPermissions(userPermissions);
    if (perms.includes(Permission.AccessAll)) return true;
    if (permissionsToCheck.some(c => perms.includes(c))) return true;
    return false;
  }
  catch {
    return false;
  }
};

export default Permission;

export const PermissionActions = {
  userHasAllPermissions: userHasAllPermissions,
  userHasPermission: userHasPermission,
  getUserPermissions: getUserPermissions,
  getPermissionName: getPermissionName,
  userHasAnyPermissions: userHasAnyPermissions
};