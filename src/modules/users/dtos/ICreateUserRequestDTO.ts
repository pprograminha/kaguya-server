interface ICreateUserRequestDTO {
  email: string;
  name?: string;
  username: string;
  password: string;
  role?: string;
  creator_id?: string;
}
export { ICreateUserRequestDTO };
