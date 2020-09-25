export interface HasFormatter {
  type: string;
  recipient?: string;
  client?: string;
  details: string;
  amount: number;
  format(): string;
}
