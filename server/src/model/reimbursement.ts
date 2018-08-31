import { User } from "./user";

export class Reimbursement {
    public reimbursementId: number;
    public author: User;
    public resolver: User;
    public amount: number;
    public submitted: number;
    public resolved: number;
    public description: string;
    public status: string;
    public type: string;

    constructor(reimbursementId?: number, author?: User, resolver?: User, amount?: number, submitted?: number, resolved?: number, description?: string, status?: string, type?: string) {
        reimbursementId && (this.reimbursementId = reimbursementId);
        author && (this.author = author);
        resolver && (this.resolver = resolver);
        amount && (this.amount = amount);
        submitted && (this.submitted = submitted);
        resolved && (this.resolved = resolved);
        description && (this.description = description);
        status && (this.status = status);
        type && (this.type = type);
    }
}