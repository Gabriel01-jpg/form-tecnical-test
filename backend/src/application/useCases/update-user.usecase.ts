import User from "../../domain/user/entity/user";
import UserRepositoryInterface from "../../domain/user/repository/user.repository.interface";
import UpdateUserDto from "../dtos/update-user.dto";

export default class UpdateUserUseCase {
  constructor(readonly userRepository: UserRepositoryInterface) {}

  async execute({ id, name, email, cep } : UpdateUserDto): Promise<User> {
    try {
      const userExists = await this.userRepository.find(id)
      if(!userExists) {
        throw new Error('User not exists');
      }
      userExists.changeName(name);
      userExists.changeEmail(email);
      userExists.changeCep(cep);

      const newUser = await this.userRepository.update(userExists);

      return newUser;
    } catch(error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}