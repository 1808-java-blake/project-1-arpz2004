export class User {
    public userId: number;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;

    constructor(userId?: number, username?: string, password?: string, firstName?: string, lastName?: string, email?: string, role?: string) {
        userId && (this.userId = userId);
        username && (this.username = username);
        password && (this.password = password);
        firstName && (this.firstName = firstName);
        lastName && (this.lastName = lastName);
        email && (this.email = email);
        role && (this.role = role);
    }
}