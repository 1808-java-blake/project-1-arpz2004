import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { userConverter } from "../util/user-converter";

export async function findAll(): Promise<User[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM reimbursement_system.ers_user
            NATURAL JOIN reimbursement_system.user_role`);
        const users: User[] = [];
        resp.rows.forEach((userResult) => {
            users.push(userConverter(userResult));
        });
        return users;
    } finally {
        client.release();
    }
}

export async function findById(id: number): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM reimbursement_system.ers_user u
            NATURAL JOIN reimbursement_system.user_role
            WHERE u.user_id = $1`, [id]);
        const user = userConverter(resp.rows[0]);
        return user;
    } finally {
        client.release();
    }
}

export async function findByUsername(username: string): Promise<User> {
    const client = await connectionPool.connect();
    const nullUser: any = null;
    try {
        const resp = await client.query(
            `SELECT * FROM reimbursement_system.ers_user u
            NATURAL JOIN reimbursement_system.user_role
            WHERE u.username = $1`, [username]);
        if (resp.rows.length !== 0) {
            return userConverter(resp.rows[0]);
        }
        return nullUser;
    } finally {
        client.release();
    }
}

export async function create(user: User): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO reimbursement_system.ers_user
            (username, password, first_name, last_name, email, role_id)
            VALUES ($1, $2, $3, $4, $5, 
                (
                SELECT role_id
                FROM reimbursement_system.user_role
                WHERE role = $6
                )
            ) 
            RETURNING user_id`, [user.username, user.password, user.firstName, user.lastName, user.email, user.role]);
        return resp.rows[0].user_id;
    } finally {
        client.release();
    }
}