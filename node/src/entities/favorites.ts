import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn
} from "typeorm";

@Entity()
@Index(["user_id", "flight_number"], { unique: true })
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", nullable: false })
  flight_number: number;

  @Index()
  @Column({ type: "integer", nullable: false })
  user_id: number;

  @CreateDateColumn()
  created_at: Date;
}
