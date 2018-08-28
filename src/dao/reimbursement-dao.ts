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
                resolver.first_name AS r_first_name, resolver.last_name AS r_last_name, resolver.email AS r_email, resolver.role_id AS r_role_id
                FROM reimb
                LEFT JOIN reimbursement_system.ers_user author ON reimb.author_id = author.user_id
                LEFT JOIN reimbursement_system.ers_user resolver ON reimb.resolver_id = resolver.user_id`);
        const reimbursements = [];
        resp.rows.forEach((reimbursement_result) => {
            let reimbursement = reimbursementConverter(reimbursement_result);
            reimbursement.author = userConverter(reimbursement_result);
            Object.keys(reimbursement_result).forEach((key) => {
                if (key.startsWith('r_')) {
                    reimbursement_result[key.substring(2, key.length)] = reimbursement_result[key];
                }
            });
            reimbursement.resolver = userConverter(reimbursement_result);
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
                resolver.first_name AS r_first_name, resolver.last_name AS r_last_name, resolver.email AS r_email, resolver.role_id AS r_role_id
                FROM reimb
                LEFT JOIN reimbursement_system.ers_user author ON reimb.author_id = author.user_id
                LEFT JOIN reimbursement_system.ers_user resolver ON reimb.resolver_id = resolver.user_id`, [id]);
        const reimbursement_result = resp.rows[0];
        let reimbursement = reimbursementConverter(reimbursement_result);
        reimbursement.author = userConverter(reimbursement_result);
        Object.keys(reimbursement_result).forEach((key) => {
            if (key.startsWith('r_')) {
                reimbursement_result[key.substring(2, key.length)] = reimbursement_result[key];
            }
        });
        reimbursement.resolver = userConverter(reimbursement_result);
        return reimbursement;
    } finally {
        client.release();
    }
}

export async function create(reimbursement: Reimbursement): Promise<number> {
    const client = await connectionPool.connect();
    try {
        let author = reimbursement.author;
        let resolver = reimbursement.resolver;
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