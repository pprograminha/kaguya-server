import { MarkAsLikeOrDislikeService } from '@modules/likes/services/mark-as-like-or-dislike-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class MarkAsLikeOrDislikeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { class_id, state } = request.body;
    const user_id = request.user.id;
    const markAsLikeOrDislike = container.resolve(MarkAsLikeOrDislikeService);

    await markAsLikeOrDislike.execute({
      class_id,
      state,
      user_id,
    });

    return response.status(204).json();
  }
}
