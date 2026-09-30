import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueUserTelephone1790560561699 implements MigrationInterface {
    name = 'AddUniqueUserTelephone1790560561699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_98788fd1218e0625fa3f2eb7bb\` ON \`contacts\` (\`userId\`, \`telephone\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_98788fd1218e0625fa3f2eb7bb\` ON \`contacts\``);
    }

}
