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
            reimbursements.push(reimbursementConverter(reimbursement_result));
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
            `SELECT * FROM reimbursement_system.reimbursement r
            NATURAL JOIN reimbursement_system.reimbursement_status
            NATURAL JOIN reimbursement_system.reimbursement_type
            WHERE r.reimbursement_id = $1`, [id]);
        const reimbursement = reimbursementConverter(resp.rows[0]);
        return reimbursement;
    } finally {
        client.release();
    }
}

export async function create(reimbursement: Reimbursement): Promise<number> {
    const client = await connectionPool.connect();
    try {
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
            RETURNING reimbursementid`, [reimbursement.amount, reimbursement.submitted, reimbursement.resolved, reimbursement.description, reimbursement.author.userId, reimbursement.resolver.userId]);
        return resp.rows[0].reimbursement_id;
    } finally {
        client.release();
    }
}