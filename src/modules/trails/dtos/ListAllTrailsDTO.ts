type ListAllTrailsRequestDTO = {
  skip?: number;
  take?: number;
  exclude_my_trails?: boolean;
  user_id: string;
  order?: 'desc' | 'asc';
};

export { ListAllTrailsRequestDTO };
