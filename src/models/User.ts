import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { compare, hash } from "bcrypt";

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

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @Column("int")
  age: number;

  @Column("double precision")
  height: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }

  async comparePassword(password: string) {
    const isEquals = await compare(password, this.password);

    return isEquals;
  }
}
