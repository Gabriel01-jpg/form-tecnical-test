import RepositoryInterface from "@/domain/@shared/repository/repository-interface";
import User from "../entity/user";

export default interface UserRepositoryInterface extends RepositoryInterface<User> {
  findByEmail(email: string): Promise<User | undefined>;
}