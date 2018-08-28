export class SqlReimbursement {
    reimbursement_id: number;
    amount: number;
    submitted: number;
    resolved: number;
    description: string;
    status: string;
    type: string;
    author_user_id: number;
    author_username: string;
    author_password: string;
    author_first_name: string;
    author_last_name: string;
    author_email: string;
    resolver_user_id: number;
    resolver_username: string;
    resolver_password: string;
    resolver_first_name: string;
    resolver_last_name: string;
    resolver_email: string;
}