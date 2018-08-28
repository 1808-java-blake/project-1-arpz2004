import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { reimbursementConverter } from "../util/reimbursement-converter";

export async function findAll(): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM reimbursement_system.reimbursement
            NATURAL JOIN reimbursement_system.reimbursement_status
            NATURAL JOIN reimbursement_system.reimbursement_type`);
        const reimbursements = [];
        resp.rows.forEach((reimbursement_result) => {
            let reimbursement = reimbursementConverter(reimbursement_result);
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
            /*`SELECT r.reimbursement_id, r.amount, r.submitted, r.resolved, r.description, s.status, t.type,
            author.user_id AS author_user_id, author.username AS author_username, author.password AS author_password, author.first_name AS author_first_name,
            author.last_name AS author_last_name, author.email AS author_email, resolver.user_id AS resolver_user_id, resolver.username AS resolver_username, 
            resolver.password AS resolver_password, resolver.first_name AS resolver_first_name, resolver.last_name AS resolver_last_name, resolver.email AS resolver_email
            FROM reimbursement_system.reimbursement r
            NATURAL JOIN reimbursement_system.reimbursement_status s
            NATURAL JOIN reimbursement_system.reimbursement_type t
            LEFT JOIN reimbursement_system.ers_user author ON r.author_id = author.user_id
            LEFT JOIN reimbursement_system.ers_user resolver ON r.resolver_id = resolver.user_id
            WHERE r.reimbursement_id = $1`, [id]);*/
            `SELECT * FROM reimbursement_system.reimbursement r
            NATURAL JOIN reimbursement_system.reimbursement_status s
            NATURAL JOIN reimbursement_system.reimbursement_type t
            LEFT JOIN reimbursement_system.ers_user author ON r.author_id = author.user_id
            WHERE r.reimbursement_id = $1
            UNION
            SELECT * FROM reimbursement_system.reimbursement r
            NATURAL JOIN reimbursement_system.reimbursement_status s
            NATURAL JOIN reimbursement_system.reimbursement_type t
            LEFT JOIN reimbursement_system.ers_user resolver ON r.resolver_id = resolver.user_id
            WHERE r.reimbursement_id = $1`, [id]);
        console.log(resp.rows);
        const reimbursement_result = resp.rows[0];
        let reimbursement = reimbursementConverter(reimbursement_result);
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