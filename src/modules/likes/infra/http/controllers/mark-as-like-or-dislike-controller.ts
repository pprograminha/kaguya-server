import { MarkAsLikeOrDislikeService } from '@modules/likes/services/mark-as-like-or-dislike-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class MarkAsLikeOrDislikeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lesson_id, state } = request.body;
    const user_id = request.user.id;
    const markAsLikeOrDislike = container.resolve(MarkAsLikeOrDislikeService);

    await markAsLikeOrDislike.execute({
      lesson_id,
      state,
      user_id,
    });

    return response.status(204).json();
  }
}
