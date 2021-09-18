interface ICreateUserRequestDTO {
  email: string;
  name: string;
  password: string;
  role?: string;
  creator_id?: string;
}
export { ICreateUserRequestDTO };
