type ListAllTrailsRequestDTO = {
  skip?: number;
  take?: number;
  get_user_trail?: boolean;
  exclude_my_trails?: boolean;
  user_id: string;
  order?: 'desc' | 'asc';
};

export { ListAllTrailsRequestDTO };
