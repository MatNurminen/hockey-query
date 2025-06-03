export type UploadFileParams = {
  file: File;
  folder?: string;
};

export type MoveFileParams = {
  filename: string;
  destinationFolder: string;
};
