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

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

type User = {
  createdAt: string;
  email: string;
  image: string;
  isAdmin: boolean;
  isBanned: boolean;
  isVarified: boolean;
  name: string;
  updatedAt: string;
  _id: string;
};

export interface users {
  statusCode: any;
  message: string;
  payload: User[];
}
