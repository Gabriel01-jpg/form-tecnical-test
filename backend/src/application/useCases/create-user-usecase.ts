import User from "../../domain/user/entity/user";
import UserRepositoryInterface from "../../domain/user/repository/user.repository.interface";
import CreateUserDto from "../dtos/create-user-dto";
import { v4 as uuidv4 } from 'uuid';

export default class CreateUserUseCase {
  constructor(readonly userRepository: UserRepositoryInterface) {}

  async execute({ name, email, cep } : CreateUserDto): Promise<User> {
    try {
      const userExists = await this.userRepository.findByEmail(email);
      if(userExists) {
        throw new Error('User already exists');
      }

      const user = new User(uuidv4(), name, email, cep);
      const newUser = await this.userRepository.create(user);
      return newUser;
    } catch(error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}