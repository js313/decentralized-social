import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1749494052476 implements MigrationInterface {
    name = 'InitSchema1749494052476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("post_id" integer NOT NULL, "wallet_address" character varying NOT NULL, CONSTRAINT "PK_3949169ac4a2148f638bd2d68b4" PRIMARY KEY ("post_id", "wallet_address"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
