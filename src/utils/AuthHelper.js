export const DoesUserHavePermission = (userPermissions, permission) => {
  return userPermissions
    ? userPermissions.some((item) => item === permission)
    : false;
};

export const IsUserInRole = (userRoles, role) => {
  return userRoles ? userRoles.some((item) => item === role) : false;
};
