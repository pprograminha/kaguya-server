interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}
export { IUser };
