type ListAllUserTrailsFromUserRequestDTO = {
  user_id: string;
  skip?: number;
  take?: number;
  order?: 'asc' | 'desc';
  enabled: boolean;
};

export { ListAllUserTrailsFromUserRequestDTO };
