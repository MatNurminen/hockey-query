export type UploadFileParams = {
  file: File;
  folder?: string;
};

export type MoveFileParams = {
  fromKey: string;
  toKey: string;
};

export type TCfSubfolderDto = {
  subfolderName: string;
};
