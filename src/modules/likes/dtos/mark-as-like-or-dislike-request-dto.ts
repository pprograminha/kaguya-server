type MarkAsLikeOrDislikeRequestDTO = {
  lesson_id: string;
  state: 'like' | 'dislike' | 'none';
  user_id: string;
};

export { MarkAsLikeOrDislikeRequestDTO };
