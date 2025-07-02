import api from "@/adapters/infrastructures/ClientHTTP"
import CommentRepository from "./repositories/comment-repository";
import { IComment } from "../../model/IComment";
import { IUser } from "../../model/IUser";
import { User, Comment } from "@/types/api";
import { POLICIES } from "@/lib/authorization";

export default function diInit() {
    const repositories = {
        comment: new CommentRepository(api),
    };

    const deletePolicy = (user: IUser, comment: IComment) => POLICIES['comment:delete'](
        user as User,
        comment as Comment,
    );

    return {
        api: repositories,
        policies: {
            delete: deletePolicy
        }
    };
}
