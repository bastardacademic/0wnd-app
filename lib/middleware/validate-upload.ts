import { fromBuffer } from 'file-type';
import fs from 'fs/promises';

export async function validateUpload(file: Express.Multer.File, groupId: string) {
  const allowedTypes = ['image/', 'video/', 'audio/'];

  const buffer = await fs.readFile(file.path);
  const fileType = await fromBuffer(buffer);
  const isSafe = fileType && allowedTypes.some(type => fileType.mime.startsWith(type));

  if (!isSafe) {
    await fs.unlink(file.path); // cleanup unsafe file
    throw new Error('Invalid or unsafe file type');
  }

  return true;
}