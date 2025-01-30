import { Sequelize } from "sequelize-typescript";
import { ExpressAdapter } from "./infra/http/HttpServer";
import UserModel from "./infra/database/sequelize/model/user.model";
import UserController from "./infra/http/controllers/user-controller";

(async () => {
  console.log('Starting server...');
  const httpServer = new ExpressAdapter();
  
  let sequelize: Sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });
  await sequelize.addModels([UserModel]);
  await sequelize.sync();
  
  new UserController(httpServer)
  
  console.log('Server running at http://localhost:3000');
  httpServer.listen(3000);
})();