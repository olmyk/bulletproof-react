import { IDiscussion } from "@/features/discussions/model/IDiscussion";
import { IMeta } from "@/features/discussions/model/IMeta";

export default interface IDiscussionRepository {
    getDiscussion({
        discussionId,
    }: {
        discussionId: string;
    }): Promise<{ data: IDiscussion }>

    getDiscussions(
        page: number,
    ): Promise<{
        data: IDiscussion[];
        meta: IMeta;
    }>

    createDiscussion({
        data,
    }: {
        data: {
            title: string,
            body: string,
        };
    }): Promise<IDiscussion>

    updateDiscussion({
        data,
        discussionId,
    }: {
        data: {
            title: string,
            body: string,
        };
        discussionId: string;
    }): Promise<IDiscussion>

    deleteDiscussion({
        discussionId,
    }: {
        discussionId: string;
    }): any
}