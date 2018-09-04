export class User {
    public userId: number
    public username: string
    public password: undefined
    public firstName: string
    public lastName: string
    public email: string
    public role: string

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
      }
}