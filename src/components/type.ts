export interface IContact {
  name: string;
  email: string;
  message?: string;
}

export interface IResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload?: any;
}
