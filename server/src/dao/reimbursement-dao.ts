import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { userConverter } from "../util/user-converter";

export async function findAll(): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `WITH reimb AS (SELECT * FROM reimbursement_system.reimbursement r
                NATURAL JOIN reimbursement_system.reimbursement_status s
                NATURAL JOIN reimbursement_system.reimbursement_type t)
                SELECT reimb.*, author.*, resolver.user_id AS r_user_id, resolver.username AS r_username, resolver.password AS r_password, 
                resolver.first_name AS r_first_name, resolver.last_name AS r_last_name, resolver.email AS r_email, author_role.role, resolver_role.role AS r_role
                FROM reimb
                LEFT JOIN reimbursement_system.ers_user author ON reimb.author_id = author.user_id
                NATURAL JOIN reimbursement_system.user_role author_role
                LEFT JOIN reimbursement_system.ers_user resolver ON reimb.resolver_id = resolver.user_id
                INNER JOIN reimbursement_system.user_role resolver_role ON resolver_role.role_id = resolver.role_id`);
        const reimbursements: Reimbursement[] = [];
        resp.rows.forEach((reimbursementResult) => {
            const reimbursement = reimbursementConverter(reimbursementResult);
            reimbursement.author = userConverter(reimbursementResult);
            Object.keys(reimbursementResult).forEach((key) => {
                if (key.startsWith('r_')) {
                    reimbursementResult[key.substring(2, key.length)] = reimbursementResult[key];
                }
            });
            reimbursement.resolver = userConverter(reimbursementResult);
            reimbursements.push(reimbursement);
        });
        return reimbursements;
    } finally {
        client.release();
    }
}

export async function findById(id: number): Promise<Reimbursement> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `WITH reimb AS (SELECT * FROM reimbursement_system.reimbursement r
                NATURAL JOIN reimbursement_system.reimbursement_status s
                NATURAL JOIN reimbursement_system.reimbursement_type t
                WHERE r.reimbursement_id = $1)
                SELECT reimb.*, author.*, resolver.user_id AS r_user_id, resolver.username AS r_username, resolver.password AS r_password, 
                resolver.first_name AS r_first_name, resolver.last_name AS r_last_name, resolver.email AS r_email, author_role.role, resolver_role.role AS r_role
                FROM reimb
                LEFT JOIN reimbursement_system.ers_user author ON reimb.author_id = author.user_id
                NATURAL JOIN reimbursement_system.user_role author_role
                LEFT JOIN reimbursement_system.ers_user resolver ON reimb.resolver_id = resolver.user_id
                INNER JOIN reimbursement_system.user_role resolver_role ON resolver_role.role_id = resolver.role_id`, [id]);
        const reimbursementResult = resp.rows[0];
        const reimbursement = reimbursementConverter(reimbursementResult);
        reimbursement.author = userConverter(reimbursementResult);
        Object.keys(reimbursementResult).forEach((key) => {
            if (key.startsWith('r_')) {
                reimbursementResult[key.substring(2, key.length)] = reimbursementResult[key];
            }
        });
        reimbursement.resolver = userConverter(reimbursementResult);
        return reimbursement;
    } finally {
        client.release();
    }
}

export async function findByAuthorId(authorId: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `WITH reimb AS (SELECT * FROM reimbursement_system.reimbursement r
                NATURAL JOIN reimbursement_system.reimbursement_status s
                NATURAL JOIN reimbursement_system.reimbursement_type t
                WHERE r.author_id = $1)
                SELECT reimb.*, author.*, resolver.user_id AS r_user_id, resolver.username AS r_username, resolver.password AS r_password, 
                resolver.first_name AS r_first_name, resolver.last_name AS r_last_name, resolver.email AS r_email, author_role.role, resolver_role.role AS r_role
                FROM reimb
                LEFT JOIN reimbursement_system.ers_user author ON reimb.author_id = author.user_id
                NATURAL JOIN reimbursement_system.user_role author_role
                LEFT JOIN reimbursement_system.ers_user resolver ON reimb.resolver_id = resolver.user_id
                INNER JOIN reimbursement_system.user_role resolver_role ON resolver_role.role_id = resolver.role_id`, [authorId]);
        const reimbursements: Reimbursement[] = [];
        resp.rows.forEach((reimbursementResult) => {
            const reimbursement = reimbursementConverter(reimbursementResult);
            reimbursement.author = userConverter(reimbursementResult);
            Object.keys(reimbursementResult).forEach((key) => {
                if (key.startsWith('r_')) {
                    reimbursementResult[key.substring(2, key.length)] = reimbursementResult[key];
                }
            });
            reimbursement.resolver = userConverter(reimbursementResult);
            reimbursements.push(reimbursement);
        });
        return reimbursements;
    } finally {
        client.release();
    }
}

export async function create(reimbursement: Reimbursement): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const author = reimbursement.author;
        const resolver = reimbursement.resolver;
        const resp = await client.query(
            `INSERT INTO reimbursement_system.reimbursement
            (amount, submitted, resolved, description, author_id, resolver_id, status_id, type_id)
            VALUES ($1, $2, $3, $4, $5, $6, 
                (
                    SELECT status_id
                    FROM reimbursement_system.reimbursement_status
                    WHERE status = $7
                ),
                (
                    SELECT type_id
                    FROM reimbursement_system.reimbursement_type
                    WHERE type = $8
                )
            )
            RETURNING reimbursement_id`, [reimbursement.amount, reimbursement.submitted, reimbursement.resolved, reimbursement.description, author && author.userId, resolver && resolver.userId, reimbursement.status, reimbursement.type]);
        return resp.rows[0].reimbursement_id;
    } finally {
        client.release();
    }
}

export async function update(reimbursement: Reimbursement): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const author = reimbursement.author;
        const resolver = reimbursement.resolver;
        const resp = await client.query(
            `UPDATE reimbursement_system.reimbursement
            SET amount=$1, submitted=$2, resolved=$3, description=$4, author_id=$5, resolver_id=$6, 
            status_id=(
                SELECT status_id
                FROM reimbursement_system.reimbursement_status
                WHERE status = $7
            ), type_id=(
                SELECT type_id
                FROM reimbursement_system.reimbursement_type
                WHERE type = $8
            )
            WHERE reimbursement_id=$9
            RETURNING reimbursement_id`, [reimbursement.amount, reimbursement.submitted, reimbursement.resolved, reimbursement.description, author && author.userId, resolver && resolver.userId, reimbursement.status, reimbursement.type, reimbursement.reimbursementId]);
        return resp.rows[0].reimbursement_id;
    } finally {
        client.release();
    }
}