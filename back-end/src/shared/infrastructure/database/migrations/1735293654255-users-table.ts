import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1735293654255 implements MigrationInterface {
  name = 'UsersTable1735293654255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL`);
  }
}
