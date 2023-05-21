type CreateUserRequestDTO = {
  email?: string;
  name?: string;
  username: string;
  password?: string;
  role?: string;
  creator_id?: string;
  avatar_url?: string;
  auth_id?: string;
  email_verified?: boolean;
  phone_number?: string;
};
export { CreateUserRequestDTO };
