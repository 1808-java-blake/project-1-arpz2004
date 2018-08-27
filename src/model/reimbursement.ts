import { User } from "./user";

export class Reimbursement {
    reimbursementId: number;
    author: User;
    resolver: User;
    amount: number;
    submitted: number;
    resolved: number;
    description: string;
    status: ReimbursementStatus;
    type: ReimbursementType;

    constructor(reimbursementId?: number, author?: User, resolver?: User, amount?: number, submitted?: number, resolved?: number, description?: string, status?: ReimbursementStatus, type?: ReimbursementType) {
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

enum ReimbursementStatus {
    Pending,
    Approved,
    Denied
}

enum ReimbursementType {
    Lodging,
    Travel,
    Food,
    Other
}