import { HTTPError } from 'ky';


export const isHTTPError = (error: unknown): error is HTTPError => {
  return error instanceof HTTPError;
};

export const getErrorJson = async <T = Record<string, any>>(error: HTTPError): Promise<T> => {
  return await error.response.json<T>();
};