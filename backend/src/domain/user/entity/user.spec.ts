import User from "./user";

describe("user unit test", () => {

  it("should throw error when id is empty", () => {
      expect(() => {
          let user = new User("", "Gabriel", "gabriellima01.js@gmail.com", "75258787");
      }).toThrow("Id is required")
  })

  it("should throw error when name is empty", () => {
      expect(() => {
        let user = new User("12345678", "", "gabriellima01.js@gmail.com", "75258787");
      }).toThrow("Name is required")
  })

  it("should throw error when email is empty", () => {
    expect(() => {
        let user = new User("12345678", "gabriel123", "", "75258787");
      }).toThrow("Email is required")
  })

  it("should throw error when email is empty", () => {
    expect(() => {
        let user = new User("12345678", "gabriel123", "gabriellima01.js@gmail.com", "");
      }).toThrow("CEP is required")
  })

  it("should throw error when name contains numbers", () => {
    expect(() => {
        let user = new User("12345678", "gabriel123", "gabriellima01.js@gmail.com", "75258787");
      }).toThrow("Name must not contain numbers")
  })

  it("should throw error when cep contains letters", () => {
    expect(() => {
        let user = new User("12345678", "gabriel", "gabriellima01.js@gmail.com", "123331aaa");
      }).toThrow("CEP must contain only numbers")
  })
})