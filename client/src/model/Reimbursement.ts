export class Reimbursement {
  public reimbursementId: number
  public amount: number
  public submitted: number
  public resolved: number
  public description: string
  public status: string
  public type: string

  constructor(reimbursementId?: number, amount?: number, submitted?: number, resolved?: number, description?: string, status?: string, type?: string) {
    if (reimbursementId) { this.reimbursementId = reimbursementId }
    if (amount) { this.amount = amount }
    if (submitted) { this.submitted = submitted }
    if (resolved) { this.resolved = resolved }
    if (description) { this.description = description }
    if (status) { this.status = status }
    if (type) { this.type = type }
  }

}