import { allArray, forEachArray, mapArray } from '@/shared/utils/array-util';
import { splitString, trimString } from '@/shared/utils/string-util';

export const hasPermission = (
  requiredPermissions: string[],
  userPermissions: string[],
): boolean => {
  const permissionMap: { [key: string]: Set<string> } = {};

  forEachArray(userPermissions, (permission) => {
    const [resource, actions] = mapArray(splitString(permission, ':'), (part) =>
      trimString(part),
    );
    if (!permissionMap[resource]) {
      permissionMap[resource] = new Set();
    }
    forEachArray(splitString(actions, ''), (action) =>
      permissionMap[resource].add(action),
    );
  });

  return allArray(requiredPermissions, (requiredPermission) => {
    const [requiredResource, requiredActions] = mapArray(
      splitString(requiredPermission, ':'),
      (part) => trimString(part),
    );
    if (!permissionMap[requiredResource]) {
      return false;
    }
    return allArray(
      splitString(requiredActions, ''),
      (action) =>
        permissionMap[requiredResource].has(action) ||
        permissionMap[requiredResource].has('*'),
    );
  });
};
