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

export interface User {
  createdAt: string;
  email: string;
  image: string;
  gender: string | undefined;
  birthday: string | undefined;
  phone: string | undefined;
  isAdmin: boolean;
  isBanned: boolean;
  isVerified: boolean;
  name: string;
  updatedAt: string;
  _id: string;
}

export interface UsersResponse {
  statusCode: number;
  message: string;
  payload: User[];
}

export interface IVerify {
  email: string;
  verificationCode: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface products {
  statusCode: number;
  message: string;
  payload: any;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  size: string;
}

export interface ICartProduct {
  statusCode: number;
  success: boolean;
  message: string;
  payload?: IProduct[];
}

type review = {
  _id: string;
  name: string;
  image: string;
  rating: number;
  comment: string;
};

export interface reviews {
  statusCode: number;
  message: string;
  payload: review[];
}
