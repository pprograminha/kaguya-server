interface ICreateUserRequestDTO {
  email: string;
  name: string;
  password: string;
  role_name?: string;
  admin_id?: string;
}
export { ICreateUserRequestDTO };
