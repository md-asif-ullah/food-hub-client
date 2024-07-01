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
  address: string | undefined;
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

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

export interface ICartProduct {
  statusCode: number;
  success: boolean;
  message: string;
  payload?: IProduct[];
}

export interface IAddToCartType {
  userId: string | undefined;
  name: string;
  price: number;
  image: string;
  size: string;
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

export interface createProduct {
  name: string;
  price: string;
  description: string;
  category: string;
  discount: string;
  quantity: string;
}

export interface IUpdatequantity {
  _id: string;
  quantity: number;
}

export interface Favourite {
  userId: string | undefined;
  productId: string;
}

export interface IOrder {
  _id?: string;
  userId: string | undefined;
  name: string;
  companyNumber: string | undefined;
  address: string;
  phoneNumber: number;
  paymentType: string;
  totalPayAmount: number;
  orderId: number;
  cartProducts: IProduct[];
  status: string;
  message?: string | undefined;
}

export interface Products {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  discount: number;
  description: string;
  createdAt: string;
}

export interface ProductsResponse {
  statusCode: number;
  message: string;
  payload: Products[];
}

export interface getproductResponse {
  statusCode: number;
  message: string;
  payload: any;
}
