import User from "@/domain/user/entity/user";
import UserRepositoryInterface from "../../domain/user/repository/user.repository.interface";

export default class ListUsersUseCase {
  constructor(readonly userRepository: UserRepositoryInterface) {}

  async execute(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch(error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}