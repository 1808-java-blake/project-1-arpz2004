import { User } from "./User";

export class Reimbursement {
  public reimbursementId: number
  public amount: number
  public submitted: string
  public resolved: string
  public description: string
  public author: User
  public resolver: User
  public status: string
  public type: string
}