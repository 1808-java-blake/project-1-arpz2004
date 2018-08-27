export class User {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;

    constructor(userId?: number, username?: string, password?: string, firstName?: string, lastName?: string, email?: string, role?: UserRole) {
        userId && (this.userId = userId);
        username && (this.username = username);
        password && (this.password = password);
        firstName && (this.firstName = firstName);
        lastName && (this.lastName = lastName);
        email && (this.email = email);
        role && (this.role = role);
    }
}

enum UserRole {
    Employee,
    Manager
}