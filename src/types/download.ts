export type DownloadDataset = {
  クラブ: string;
  年: number;
  所属: string;
  slug: string;
} & {
  [key: string]: number | string | null;
};
