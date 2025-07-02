import IClientHTTP from "@/adapters/infrastructures/interfaces/IClientHTTP"
import IDiscussionRepository from "../interfaces/IDiscussionRepository";
import { IDiscussion } from "@/features/discussions/model/IDiscussion";
import { IMeta } from "@/features/discussions/model/IMeta";

export default class DiscussionRepository implements IDiscussionRepository {
    private client: IClientHTTP

    constructor(client: IClientHTTP) {
        this.client = client
    }
    async getDiscussion({ discussionId, }: { discussionId: string; }): Promise<{ data: IDiscussion; }> {
        return await this.client.get(`/discussions/${discussionId}`);
    }

    async getDiscussions(page: number): Promise<{ data: IDiscussion[]; meta: IMeta; }> {
        const { data, meta } = await this.client.get(`/discussions`, {
            params: {
                page,
            },
        }) as unknown as { data: IDiscussion[]; meta: IMeta };

        return { data, meta };
    }

    async createDiscussion({ data, }: { data: { title: string; body: string; }; }): Promise<IDiscussion> {
        const result = await this.client.post(`/discussions`, data);

        return result as unknown as IDiscussion;
    }

    async updateDiscussion({ data, discussionId, }: { data: { title: string; body: string; }; discussionId: string; }): Promise<IDiscussion> {
        const result = await this.client.patch(`/discussions/${discussionId}`, data);

        return result as unknown as IDiscussion;
    }

    async deleteDiscussion({ discussionId, }: { discussionId: string; }) {
        return await this.client.delete(`/discussions/${discussionId}`);
    }
}
