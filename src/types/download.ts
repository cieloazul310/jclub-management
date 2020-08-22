export type DownloadDataset = {
  クラブ: string;
  年: number;
  所属: string;
  id: string;
} & {
  [key: string]: number | string | null;
};
