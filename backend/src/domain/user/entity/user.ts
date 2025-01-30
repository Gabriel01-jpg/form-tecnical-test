import UserInterface from "./user.interface";

export default class User implements UserInterface {

  private _id: string;
  private _name: string;
  private _email: string;
  private _cep: string;

  constructor(id: string, name: string, email: string, cep: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._cep = cep;

    this.validate();
  }

  private validate() {
    if(this._name.length === 0) {
      throw new Error('Name is required');
    }
    if(this._id.length === 0) {
      throw new Error('Id is required');
    }
    if(this._email.length === 0) {
      throw new Error('Email is required');
    }
    if(this._email.indexOf('@') === -1) {
      throw new Error('Email is invalid');
    }
    if(this._cep.length === 0) {
      throw new Error('CEP is required');
    }
    if (/\d/.test(this._name)) {
      throw new Error('Name must not contain numbers');
    }
    if(this._cep.match(/^[0-9]+$/) === null) {
      throw new Error('CEP must contain only numbers');
    }

  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get cep(): string {
    return this._cep;
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  changeEmail(email: string) {
    this._email = email;

    this.validate();
  }

  changeCep(cep: string) {
    this._cep = cep;

    this.validate();
  }
}