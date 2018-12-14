interface Todo {
  title: string;
}

export type TodoMap = { [key in any]: Todo };