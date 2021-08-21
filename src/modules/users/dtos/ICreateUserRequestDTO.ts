interface ICreateUserRequestDTO {
  email: string;
  name: string;
  password: string;
  role?: string;
  admin_id?: string;
}
export { ICreateUserRequestDTO };
