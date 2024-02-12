export interface User extends Record<string, any> {
  readonly id: string,
  name: string,
  age: number,
  hobbies: Array<string> | [],
};

export type NewUser = Omit<User, 'id'>;

