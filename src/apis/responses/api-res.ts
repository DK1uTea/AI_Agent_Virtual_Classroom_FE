export type ApiResult<T> = {
  data: T;
  message: string;
  status?: string;
  timestamp?: string;
}
