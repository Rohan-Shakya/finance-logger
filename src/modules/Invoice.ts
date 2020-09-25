import { HasFormatter } from '../interfaces/HasFormatter';

export class Invoice implements HasFormatter {
  constructor(
    readonly type: string,
    public client: string,
    public details: string,
    public amount: number
  ) {}

  format() {
    return `${this.client} owes ${this.amount} for ${this.details}`;
  }
}
