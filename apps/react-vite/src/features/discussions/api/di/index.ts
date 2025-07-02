import api from "@/adapters/infrastructures/ClientHTTP"
import DiscussionRepository from "./repositories/discussion-repository";

export default function diInit() {
    const repositories = {
        discussion: new DiscussionRepository(api),
    };

    return {
        api: repositories,
    };
}
