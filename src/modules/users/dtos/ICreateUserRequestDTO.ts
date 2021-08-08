interface ICreateUserRequestDTO {
  email: string;
  name: string;
  password: string;
  role?: string;
  permission?: number;
}
export { ICreateUserRequestDTO };
