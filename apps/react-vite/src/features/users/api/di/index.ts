import api from "@/adapters/infrastructures/ClientHTTP"
import UserRepository from "./repositories/user-repository";
import { IUser } from "../../model/IUser";
import { User } from "@/types/api";

export default function diInit() {
    const repositories = {
        user: new UserRepository(api),
    };

    return {
        api: repositories,
        getUsersDTO: (users: IUser[]) => users as User[]
    };
}
