export interface ITodoApi {
  getTodos(userUid: string): Promise<any>;

  createTodo(userUid: string, title: string, timestamp: number): Promise<any>;

  startListenTodos(userUid: string, onUpdate: any): void;

  stopListenTodos(): void;
}