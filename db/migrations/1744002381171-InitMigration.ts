import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1744002381171 implements MigrationInterface {
    name = 'InitMigration1744002381171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "date" date NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."fight_method_enum" AS ENUM('knockouts', 'submissions', 'decisionOfJudge')`);
        await queryRunner.query(`CREATE TYPE "public"."fight_status_enum" AS ENUM('scheduled', 'completed')`);
        await queryRunner.query(`CREATE TABLE "fight" ("id" SERIAL NOT NULL, "winnerId" integer, "draw" integer, "method" "public"."fight_method_enum", "status" "public"."fight_status_enum", "round" integer, "time" character varying, "fighter1Id" integer, "fighter2Id" integer, "eventId" integer, CONSTRAINT "PK_c6ddb4bcedc3415b9f1b9d07b06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."fighter_weightclass_enum" AS ENUM('lightWeight', 'middleWeight', 'heavyWeight')`);
        await queryRunner.query(`CREATE TABLE "fighter" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nationality" character varying NOT NULL, "team" character varying NOT NULL, "weightClass" "public"."fighter_weightclass_enum" NOT NULL, "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', "draws" integer NOT NULL DEFAULT '0', "knockouts" integer NOT NULL DEFAULT '0', "submissions" integer NOT NULL DEFAULT '0', "decisionOfJudge" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_029b5ccffdaaf857641a7841885" UNIQUE ("name"), CONSTRAINT "PK_2719a8a2de10cfa27adde3f15db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ranking_weightclass_enum" AS ENUM('lightWeight', 'middleWeight', 'heavyWeight')`);
        await queryRunner.query(`CREATE TABLE "ranking" ("id" SERIAL NOT NULL, "weightClass" "public"."ranking_weightclass_enum" NOT NULL, "rank" integer NOT NULL DEFAULT '0', "fighterId" integer, CONSTRAINT "REL_f882b9a53f25d1c8e5fe67ab34" UNIQUE ("fighterId"), CONSTRAINT "PK_bf82b8f271e50232e6a3fcb09a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_2de71cc862710b86b748c517df0" FOREIGN KEY ("fighter1Id") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_4664ae59ee7c3a84b085fd16472" FOREIGN KEY ("fighter2Id") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_5b977841fa5df7809fede4adb2b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD CONSTRAINT "FK_f882b9a53f25d1c8e5fe67ab346" FOREIGN KEY ("fighterId") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" DROP CONSTRAINT "FK_f882b9a53f25d1c8e5fe67ab346"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_5b977841fa5df7809fede4adb2b"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_4664ae59ee7c3a84b085fd16472"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_2de71cc862710b86b748c517df0"`);
        await queryRunner.query(`DROP TABLE "ranking"`);
        await queryRunner.query(`DROP TYPE "public"."ranking_weightclass_enum"`);
        await queryRunner.query(`DROP TABLE "fighter"`);
        await queryRunner.query(`DROP TYPE "public"."fighter_weightclass_enum"`);
        await queryRunner.query(`DROP TABLE "fight"`);
        await queryRunner.query(`DROP TYPE "public"."fight_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."fight_method_enum"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
