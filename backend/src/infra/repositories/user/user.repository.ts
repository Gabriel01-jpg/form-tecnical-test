import User from "../../../domain/user/entity/user";
import UserModel from "../../../infra/database/sequelize/model/user.model";
import UserRepositoryInterface from "../../../domain/user/repository/user.repository.interface";

export default class UserRepository implements UserRepositoryInterface {
  async create(entity: User): Promise<User> {
    const user = await UserModel.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      cep: entity.cep,
    })

    return new User(user.id, user.name, user.email, user.cep);
  }

  delete(entity: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async find(id: string): Promise<User> {
    try {
      const user = await UserModel.findOne({ where: { id }, rejectOnEmpty: true });
      const userEntity = new User(user.id, user.name, user.email, user.cep);
      return userEntity;
    } catch(error) {
      console.log(error);
      throw new Error("User not found.");
    }
  }

  async findAll(): Promise<User[] | []> {
    const users = await UserModel.findAll();
    if(users.length === 0) {
      return []
    }
    
    return users.map(user => new User(user.id, user.name, user.email, user.cep));
  }

  async update(entity: User): Promise<User> {
    await UserModel.update({
      name: entity.name,
      email: entity.email,
      cep: entity.cep,
    }, {
      where: { id: entity.id }
    })

    return new User(entity.id, entity.name, entity.email, entity.cep);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ where: { email } });
    if(!user) {
      return undefined;
    }
    return new User(user.id, user.name, user.email, user.cep);
  }
}