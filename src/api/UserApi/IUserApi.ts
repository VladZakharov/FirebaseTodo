export interface IUserApi {
  getUsers(): Promise<any>;

  createUser(uid: string, name: string): Promise<any>;

  startListenUsers(onUpdate: any): void;

  stopListenUsers(): void;
}