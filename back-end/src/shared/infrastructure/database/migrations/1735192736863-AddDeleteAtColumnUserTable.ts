import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteAtColumnUserTable1735192736863 implements MigrationInterface {
  name = 'AddDeleteAtColumnUserTable1735192736863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`deleted_at\` timestamp(6) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleted_at\``);
  }
}
