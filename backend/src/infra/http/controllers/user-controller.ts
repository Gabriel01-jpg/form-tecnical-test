import { Request, Response } from "express";
import HttpServer from "../HttpServer";
import UserRepository from "../../repositories/user/user.repository";
import CreateUserUseCase from "../../../application/useCases/create-user-usecase";
import User from "../../../domain/user/entity/user";
import ListUsersUseCase from "../../../application/useCases/list-users.usecase";
import UpdateUserUseCase from "../../../application/useCases/update-user.usecase";

export default class UserController {
  constructor(readonly httpServer: HttpServer) {
    this.httpServer.registerRoute('post', '/users', async function createUser(req: Request, res: Response): Promise<User> {

      try {
        const { name, email, cep } = req.body;
        // i would use tsyringe here to inject the dependencies
        const userRepository = new UserRepository();
        const createUserUseCase = new CreateUserUseCase(userRepository);

        const user = await createUserUseCase.execute({ name, email, cep });
        return user;
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
      }
    });

    this.httpServer.registerRoute('get', '/users', async function findUser(req: Request, res: Response): Promise<User[] | []> {
      try {
        // i would use tsyringe here to inject the dependencies
        const userRepository = new UserRepository();
        const listUsersUseCase = new ListUsersUseCase(userRepository)

        const users = await listUsersUseCase.execute();
        return users;
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
      }
    });

    this.httpServer.registerRoute('put', '/users', async function updateUser(req: Request, res: Response): Promise<User> {
      try {
        const { id, name, email, cep } = req.body;

        const userRepository = new UserRepository();
        const updateUserUseCase = new UpdateUserUseCase(userRepository)
        
        const newUser = await updateUserUseCase.execute({ id, name, email, cep });
        
        return newUser;
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
      }
    });
  }
}