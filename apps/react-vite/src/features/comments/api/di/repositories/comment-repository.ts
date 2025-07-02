import IClientHTTP from "@/adapters/infrastructures/interfaces/IClientHTTP"
import ICommentRepository from "../interfaces/ICommentRepository";
import { IComment } from "@/features/comments/model/IComment";
import { IMeta } from "@/features/comments/model/IMeta";

export default class CommentRepository implements ICommentRepository {
  private client: IClientHTTP

  constructor(client: IClientHTTP) {
    this.client = client
  }

  async getComments({
    discussionId,
    page = 1,
  }: {
    discussionId: string;
    page?: number;
  }): Promise<{ data: IComment[]; meta: IMeta }> {
    const { data, meta }: { data: IComment[]; meta: IMeta } = await this.client.get(`/comments`, {
      params: {
        discussionId,
        page,
      },
    }) as unknown as { data: IComment[]; meta: IMeta };

    return { data, meta };
  }


  async createComment({
    data: input,
  }: {
    data: {
      discussionId: string,
      body: string,
    }
  }): Promise<IComment> {
    const { data } = await this.client.post<IComment>('/comments', input);

    return data;
  }

  async deleteComment({ commentId }: { commentId: string }) {
    return this.client.delete(`/comments/${commentId}`);
  }
}
