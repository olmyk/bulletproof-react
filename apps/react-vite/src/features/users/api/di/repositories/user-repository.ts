import IClientHTTP from "@/adapters/infrastructures/interfaces/IClientHTTP"
import IUserRepository from "../interfaces/IUserRepository";
import { IUser } from "@/features/users/model/IUser";

export default class UserRepository implements IUserRepository {
  private client: IClientHTTP

  constructor(client: IClientHTTP) {
    this.client = client
  }

  async getUsers(): Promise<{ data: IUser[]; }> {
    return await this.client.get(`/users`);
  }

  async deleteUser({ userId }: { userId: string; }) {
    return await this.client.delete(`/users/${userId}`);
  }

  async updateProfile({ data }: { data: { email: string; firstName: string; lastName: string; bio: string; }; }) {
    return await this.client.patch(`/users/profile`, data);
  }
}
