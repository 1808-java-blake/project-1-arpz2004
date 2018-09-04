import { User } from "./User";

export class Reimbursement {
  public reimbursementId: number
  public amount: number
  public submitted: Date
  public resolved: Date
  public description: string
  public author: User
  public resolver: User
  public status: string
  public type: string

  public constructor(init?: Partial<Reimbursement>) {
    Object.assign(this, init);
  }
}