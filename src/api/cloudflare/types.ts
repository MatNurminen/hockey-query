export type UploadFileParams = {
  file: File;
  folder?: string;
};

export type MoveFileParams = {
  fromKey: string;
  toKey: string;
};
