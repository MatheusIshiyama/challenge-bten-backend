import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1629214291472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isUnique: true,
          },
          {
            name: "home_team",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "age",
            type: "int",
          },
          {
            name: "height",
            type: "double precision",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "NOW()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            onUpdate: "NOW()",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
