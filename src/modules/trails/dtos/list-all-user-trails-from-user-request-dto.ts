type ListAllUserTrailsFromUserRequestDTO = {
  user_id: string;
  skip?: number;
  take?: number;
  order?: 'asc' | 'desc';
};

export { ListAllUserTrailsFromUserRequestDTO };
