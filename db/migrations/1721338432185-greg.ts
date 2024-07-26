import { MigrationInterface, QueryRunner } from "typeorm";

export class Greg1721338432185 implements MigrationInterface {
    name = 'Greg1721338432185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`File\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`imageUrl\` varchar(255) NOT NULL, \`taskidId\` int NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Task\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`status\` enum ('complented', 'not stated', 'in Progress') NOT NULL DEFAULT 'not stated', \`priority\` enum ('high', 'low', 'in Progress') NOT NULL DEFAULT 'low', \`category\` enum ('high', 'low', 'in Progress') NOT NULL DEFAULT 'low', \`due_date\` datetime NOT NULL, \`create_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`userId\` int NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`confirmpassword\` varchar(255) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`File\` ADD CONSTRAINT \`FK_771e1564c818fdbafdbffcf50dc\` FOREIGN KEY (\`taskidId\`) REFERENCES \`Task\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Task\` ADD CONSTRAINT \`FK_b9a04beac0d49f34e711895715c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Task\` DROP FOREIGN KEY \`FK_b9a04beac0d49f34e711895715c\``);
        await queryRunner.query(`ALTER TABLE \`File\` DROP FOREIGN KEY \`FK_771e1564c818fdbafdbffcf50dc\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`Task\``);
        await queryRunner.query(`DROP TABLE \`File\``);
    }

}
