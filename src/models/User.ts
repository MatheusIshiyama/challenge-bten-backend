import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    name: "home_team",
    nullable: true,
  })
  homeTeam: string;

  @Column("varchar")
  name: string;

  @Column("int")
  age: number;

  @Column("double precision")
  height: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
