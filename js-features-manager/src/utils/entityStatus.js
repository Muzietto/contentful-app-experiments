import { isDraft, isPublished, isUpdated } from 'contentful-management';

export function isArchived(entity) {
  return !!entity.sys.archivedVersion;
}

export function getEntityStatus(entity) {
  if (isArchived(entity)) {
    return 'archived';
  } else if (isDraft(entity)) {
    return 'draft';
  } else if (isUpdated(entity)) {
    return 'changed';
  } else if (isPublished(entity)) {
    return 'published';
  }
  return undefined;
}
