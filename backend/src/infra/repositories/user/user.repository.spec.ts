import UserModel from "../../database/sequelize/model/user.model";
import { Sequelize } from "sequelize-typescript";
import UserRepository from "./user.repository";
import User from "../../../domain/user/entity/user";

describe("User repository test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([UserModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create a user", async () => {
        const userRepository = new UserRepository();

        const user = new User("teste1", "gabriel", "gabriellima01.js@gmail.com", "75258787");

        await userRepository.create(user);

        const userCreated = await userRepository.find("teste1")

        expect(userCreated).toEqual({
            ...user
        })
    });

    it("should update a user", async () => {
        const userRepository = new UserRepository();

        const user = new User("teste2", "gabriel", "gabriellima01.js@gmail.com", "75258787");

        await userRepository.create(user);
        

        const userCreated = await userRepository.find("teste2");

        expect(userCreated).toStrictEqual(user)

        user.changeName("Gabriel Silva");
        
        await userRepository.update(user);

        const userUpdated = await userRepository.find("teste2");
        expect(user).toStrictEqual(userUpdated);
    });

    /* it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("c1", "customer 1");
        const address = new Address("street", "city", "state", "zip");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerFound = await customerRepository.find("c1");

        expect(customerFound).toStrictEqual(customer);
    });

    it("should find all products", async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("c1", "Customer 1");
        const address = new Address("street", "city", "state", "zip");
        customer1.changeAddress(address);
        const customer2 = new Customer("c2", "Customer 2");
        customer2.changeAddress(address);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customersFound = await customerRepository.findAll();

        expect(customersFound).toStrictEqual([customer1, customer2]);
    }); */
});