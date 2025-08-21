export interface RowData {
  id: string;
  name: string;
  date: string;
  value: number;
}

export interface FormData {
  name: string;
  date: string;
  value: number | null;
}

export interface Errors {
  name: string;
  date: string;
  value: string;
}
