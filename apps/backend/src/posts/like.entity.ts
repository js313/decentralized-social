import { Entity, PrimaryColumn } from 'typeorm';

@Entity('likes')
export class Like {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn()
  wallet_address: string;
}
