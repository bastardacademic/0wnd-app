import path from 'path';

export function getGroupUploadPath(groupId: string) {
  return path.join(process.cwd(), 'public', 'uploads', 'groups', groupId);
}

export function getPublicMediaUrl(groupId: string, filename: string) {
  return \/uploads/groups/\/\\;
}