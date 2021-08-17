import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCredentials1629234093633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "email",
        type: "varchar",
        isUnique: true,
      }),
      new TableColumn({
        name: "password",
        type: "varchar",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumns("users", [
      new TableColumn({ name: "email", type: "varchar", isUnique: true }),
      new TableColumn({ name: "password", type: "varchar" }),
    ]);
  }
}
