interface ICreateUserRequestDTO {
  email: string;
  name: string;
  password: string;
  role_name?: string;

  user_logged_id?: string;
}
export { ICreateUserRequestDTO };
