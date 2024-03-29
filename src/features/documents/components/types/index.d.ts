export type DocumentsProps = {
  id: number;
  name: string;
  date: Date;
  previewLink: string;
  downloadLink: string;
}[];

export type UploadedDocumentsProps = {
  id: number;
  file: File;
}[];
