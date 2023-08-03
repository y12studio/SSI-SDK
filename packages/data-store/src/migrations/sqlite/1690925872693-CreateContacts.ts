import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateContacts1690925872693 implements MigrationInterface {
  name = 'CreateContacts1690925872693'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_BaseConfigEntity_type"`)
    await queryRunner.query(`CREATE TABLE "temporary_BaseConfigEntity" ("id" varchar PRIMARY KEY NOT NULL, "client_id" varchar(255), "client_secret" varchar(255), "scopes" text, "issuer" varchar(255), "redirect_url" text, "dangerously_allow_insecure_http_requests" boolean, "client_auth_method" text, "identifier" varchar(255), "session_id" varchar(255), "type" varchar NOT NULL, "connectionId" varchar, CONSTRAINT "REL_BaseConfig_connectionId" UNIQUE ("connectionId"))`)
    await queryRunner.query(`INSERT INTO "temporary_BaseConfigEntity"("id", "client_id", "client_secret", "scopes", "issuer", "redirect_url", "dangerously_allow_insecure_http_requests", "client_auth_method", "identifier", "session_id", "type", "connectionId") SELECT "id", "client_id", "client_secret", "scopes", "issuer", "redirect_url", "dangerously_allow_insecure_http_requests", "client_auth_method", "identifier", "session_id", "type", "connectionId" FROM "BaseConfigEntity"`)
    await queryRunner.query(`DROP TABLE "BaseConfigEntity"`)
    await queryRunner.query(`ALTER TABLE "temporary_BaseConfigEntity" RENAME TO "BaseConfigEntity"`)
    await queryRunner.query(`CREATE INDEX "IDX_BaseConfigEntity_type" ON "BaseConfigEntity" ("type")`)
    await queryRunner.query(`CREATE TABLE "temporary_CorrelationIdentifier" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( "type" IN ('did','url') ) NOT NULL, "correlation_id" text NOT NULL, "identityId" varchar, CONSTRAINT "REL_CorrelationIdentifier_identityId" UNIQUE ("identityId"), CONSTRAINT "UQ_Correlation_id" UNIQUE ("correlation_id"))`)
    await queryRunner.query(`INSERT INTO "temporary_CorrelationIdentifier"("id", "type", "correlation_id", "identityId") SELECT "id", "type", "correlation_id", "identityId" FROM "CorrelationIdentifier"`)
    await queryRunner.query(`DROP TABLE "CorrelationIdentifier"`)
    await queryRunner.query(`ALTER TABLE "temporary_CorrelationIdentifier" RENAME TO "CorrelationIdentifier"`)
    await queryRunner.query(`CREATE TABLE "temporary_IdentityMetadata" ("id" varchar PRIMARY KEY NOT NULL, "label" varchar(255) NOT NULL, "value" varchar(255) NOT NULL, "identityId" varchar)`)
    await queryRunner.query(`INSERT INTO "temporary_IdentityMetadata"("id", "label", "value", "identityId") SELECT "id", "label", "value", "identityId" FROM "IdentityMetadata"`)
    await queryRunner.query(`DROP TABLE "IdentityMetadata"`)
    await queryRunner.query(`ALTER TABLE "temporary_IdentityMetadata" RENAME TO "IdentityMetadata"`)
    await queryRunner.query(`CREATE TABLE "temporary_Identity" ("id" varchar PRIMARY KEY NOT NULL, "alias" varchar(255) NOT NULL, "roles" text, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), "contactId" varchar, CONSTRAINT "UQ_Alias" UNIQUE ("alias"))`)
    await queryRunner.query(`INSERT INTO "temporary_Identity"("id", "alias", "roles", "created_at", "last_updated_at", "contactId") SELECT "id", "alias", "roles", "created_at", "last_updated_at", "contactId" FROM "Identity"`)
    await queryRunner.query(`DROP TABLE "Identity"`)
    await queryRunner.query(`ALTER TABLE "temporary_Identity" RENAME TO "Identity"`)
    await queryRunner.query(`CREATE TABLE "temporary_Connection" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( "type" IN ('OIDC','SIOPv2','SIOPv2+OpenID4VP') ) NOT NULL, "identityId" varchar, CONSTRAINT "REL_Connection_identityId" UNIQUE ("identityId"))`)
    await queryRunner.query(`INSERT INTO "temporary_Connection"("id", "type", "identityId") SELECT "id", "type", "identityId" FROM "Connection"`)
    await queryRunner.query(`DROP TABLE "Connection"`)
    await queryRunner.query(`ALTER TABLE "temporary_Connection" RENAME TO "Connection"`)
    await queryRunner.query(`DROP INDEX "IDX_BaseConfigEntity_type"`)
    await queryRunner.query(`CREATE TABLE "temporary_Identity" ("id" varchar PRIMARY KEY NOT NULL, "alias" varchar(255) NOT NULL, "roles" text, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), "contactId" varchar, CONSTRAINT "UQ_Alias" UNIQUE ("alias"))`)
    await queryRunner.query(`INSERT INTO "temporary_Identity"("id", "alias", "roles", "created_at", "last_updated_at", "contactId") SELECT "id", "alias", "roles", "created_at", "last_updated_at", "contactId" FROM "Identity"`)
    await queryRunner.query(`DROP TABLE "Identity"`)
    await queryRunner.query(`ALTER TABLE "temporary_Identity" RENAME TO "Identity"`)
    await queryRunner.query(`CREATE TABLE "ContactType" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( "type" IN ('person','organization') ) NOT NULL, "name" varchar(255) NOT NULL, "description" varchar(255), "tenantId" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_2229e0d8c1e6817efcc982a6dde" UNIQUE ("name"))`)
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1a1fa2aa0a56649427e427a41f" ON "ContactType" ("type", "tenantId")`)
    await queryRunner.query(`CREATE TABLE "ContactOwner" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), "firstName" varchar(255), "middleName" varchar(255), "lastName" varchar(255), "displayName" varchar(255), "legalName" varchar(255), "cocNumber" varchar(255), "type" varchar NOT NULL, "contactId" varchar, CONSTRAINT "UQ_9177af8a51a2a0598d3a8c68e1e" UNIQUE ("displayName"), CONSTRAINT "UQ_91bf22d2597ff429ece6ae807aa" UNIQUE ("legalName"), CONSTRAINT "UQ_9177af8a51a2a0598d3a8c68e1e" UNIQUE ("displayName"), CONSTRAINT "REL_26ce21b29da1426fa1198b947e" UNIQUE ("contactId"))`)
    await queryRunner.query(`CREATE INDEX "IDX_e50c368daf85e7ae54585b0f7b" ON "ContactOwner" ("type")`)
    await queryRunner.query(`CREATE TABLE "ContactRelationship" ("id" varchar PRIMARY KEY NOT NULL, "leftId" varchar NOT NULL, "rightId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')))`)
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ContactRelationshipEntity_left_right" ON "ContactRelationship" ("leftId", "rightId")`)
    await queryRunner.query(`CREATE TABLE "temporary_Contact" ("id" varchar PRIMARY KEY NOT NULL, "uri" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')))`)
    await queryRunner.query(`INSERT INTO "temporary_Contact"("id", "uri", "created_at", "last_updated_at") SELECT "id", "uri", "created_at", "last_updated_at" FROM "Contact"`)
    await queryRunner.query(`DROP TABLE "Contact"`)
    await queryRunner.query(`ALTER TABLE "temporary_Contact" RENAME TO "Contact"`)
    await queryRunner.query(`CREATE TABLE "temporary_Contact" ("id" varchar PRIMARY KEY NOT NULL, "uri" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), "contactTypeId" varchar NOT NULL)`)
    await queryRunner.query(`INSERT INTO "temporary_Contact"("id", "uri", "created_at", "last_updated_at") SELECT "id", "uri", "created_at", "last_updated_at" FROM "Contact"`)
    await queryRunner.query(`DROP TABLE "Contact"`)
    await queryRunner.query(`ALTER TABLE "temporary_Contact" RENAME TO "Contact"`)
    await queryRunner.query(`CREATE TABLE "temporary_Identity" ("id" varchar PRIMARY KEY NOT NULL, "alias" varchar(255) NOT NULL, "roles" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), "contactId" varchar, CONSTRAINT "UQ_Alias" UNIQUE ("alias"))`)
    await queryRunner.query(`INSERT INTO "temporary_Identity"("id", "alias", "roles", "created_at", "last_updated_at", "contactId") SELECT "id", "alias", "roles", "created_at", "last_updated_at", "contactId" FROM "Identity"`)
    await queryRunner.query(`DROP TABLE "Identity"`)
    await queryRunner.query(`ALTER TABLE "temporary_Identity" RENAME TO "Identity"`)
    await queryRunner.query(`CREATE INDEX "IDX_228953a09ee91bbac6e28b7345" ON "BaseConfigEntity" ("type")`)
    await queryRunner.query(`DROP INDEX "IDX_228953a09ee91bbac6e28b7345"`)
    await queryRunner.query(`CREATE TABLE "temporary_BaseConfigEntity" ("id" varchar PRIMARY KEY NOT NULL, "client_id" varchar(255), "client_secret" varchar(255), "scopes" text, "issuer" varchar(255), "redirect_url" text, "dangerously_allow_insecure_http_requests" boolean, "client_auth_method" text, "identifier" varchar(255), "session_id" varchar(255), "type" varchar NOT NULL, "connectionId" varchar, CONSTRAINT "REL_BaseConfig_connectionId" UNIQUE ("connectionId"), CONSTRAINT "FK_0ab3b33e0a87e1706025e63d8a9" FOREIGN KEY ("connectionId") REFERENCES "Connection" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`)
    await queryRunner.query(`INSERT INTO "temporary_BaseConfigEntity"("id", "client_id", "client_secret", "scopes", "issuer", "redirect_url", "dangerously_allow_insecure_http_requests", "client_auth_method", "identifier", "session_id", "type", "connectionId") SELECT "id", "client_id", "client_secret", "scopes", "issuer", "redirect_url", "dangerously_allow_insecure_http_requests", "client_auth_method", "identifier", "session_id", "type", "connectionId" FROM "BaseConfigEntity"`)
    await queryRunner.query(`DROP TABLE "BaseConfigEntity"`)
    await queryRunner.query(`ALTER TABLE "temporary_BaseConfigEntity" RENAME TO "BaseConfigEntity"`)
    await queryRunner.query(`CREATE INDEX "IDX_228953a09ee91bbac6e28b7345" ON "BaseConfigEntity" ("type")`)
    await queryRunner.query(`CREATE TABLE "temporary_CorrelationIdentifier" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( "type" IN ('did','url') ) NOT NULL, "correlation_id" text NOT NULL, "identityId" varchar, CONSTRAINT "REL_CorrelationIdentifier_identityId" UNIQUE ("identityId"), CONSTRAINT "UQ_Correlation_id" UNIQUE ("correlation_id"), CONSTRAINT "FK_28945c1d57c5feee1d5d1f54510" FOREIGN KEY ("identityId") REFERENCES "Identity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`)
    await queryRunner.query(`INSERT INTO "temporary_CorrelationIdentifier"("id", "type", "correlation_id", "identityId") SELECT "id", "type", "correlation_id", "identityId" FROM "CorrelationIdentifier"`)
    await queryRunner.query(`DROP TABLE "CorrelationIdentifier"`)
    await queryRunner.query(`ALTER TABLE "temporary_CorrelationIdentifier" RENAME TO "CorrelationIdentifier"`)
    await queryRunner.query(`CREATE TABLE "temporary_IdentityMetadata" ("id" varchar PRIMARY KEY NOT NULL, "label" varchar(255) NOT NULL, "value" varchar(255) NOT NULL, "identityId" varchar, CONSTRAINT "FK_e22568cc3d201c0131b87186117" FOREIGN KEY ("identityId") REFERENCES "Identity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`)
    await queryRunner.query(`INSERT INTO "temporary_IdentityMetadata"("id", "label", "value", "identityId") SELECT "id", "label", "value", "identityId" FROM "IdentityMetadata"`)
    await queryRunner.query(`DROP TABLE "IdentityMetadata"`)
    await queryRunner.query(`ALTER TABLE "temporary_IdentityMetadata" RENAME TO "IdentityMetadata"`)
    await queryRunner.query(`DROP INDEX "IDX_e50c368daf85e7ae54585b0f7b"`)
    await queryRunner.query(`CREATE TABLE "temporary_ContactOwner" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), "firstName" varchar(255), "middleName" varchar(255), "lastName" varchar(255), "displayName" varchar(255), "legalName" varchar(255), "cocNumber" varchar(255), "type" varchar NOT NULL, "contactId" varchar, CONSTRAINT "UQ_9177af8a51a2a0598d3a8c68e1e" UNIQUE ("displayName"), CONSTRAINT "UQ_91bf22d2597ff429ece6ae807aa" UNIQUE ("legalName"), CONSTRAINT "UQ_9177af8a51a2a0598d3a8c68e1e" UNIQUE ("displayName"), CONSTRAINT "REL_26ce21b29da1426fa1198b947e" UNIQUE ("contactId"), CONSTRAINT "FK_26ce21b29da1426fa1198b947e1" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`)
    await queryRunner.query(`INSERT INTO "temporary_ContactOwner"("id", "created_at", "last_updated_at", "firstName", "middleName", "lastName", "displayName", "legalName", "cocNumber", "type", "contactId") SELECT "id", "created_at", "last_updated_at", "firstName", "middleName", "lastName", "displayName", "legalName", "cocNumber", "type", "contactId" FROM "ContactOwner"`)
    await queryRunner.query(`DROP TABLE "ContactOwner"`)
    await queryRunner.query(`ALTER TABLE "temporary_ContactOwner" RENAME TO "ContactOwner"`)
    await queryRunner.query(`CREATE INDEX "IDX_e50c368daf85e7ae54585b0f7b" ON "ContactOwner" ("type")`)
    await queryRunner.query(`DROP INDEX "IDX_ContactRelationshipEntity_left_right"`)
    await queryRunner.query(`CREATE TABLE "temporary_ContactRelationship" ("id" varchar PRIMARY KEY NOT NULL, "leftId" varchar NOT NULL, "rightId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_24a7bc0595cc5da51c91e1bee62" FOREIGN KEY ("leftId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_e673c9f78f3c7670a75c0ea7710" FOREIGN KEY ("rightId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`)
    await queryRunner.query(`INSERT INTO "temporary_ContactRelationship"("id", "leftId", "rightId", "created_at", "last_updated_at") SELECT "id", "leftId", "rightId", "created_at", "last_updated_at" FROM "ContactRelationship"`)
    await queryRunner.query(`DROP TABLE "ContactRelationship"`)
    await queryRunner.query(`ALTER TABLE "temporary_ContactRelationship" RENAME TO "ContactRelationship"`)
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ContactRelationshipEntity_left_right" ON "ContactRelationship" ("leftId", "rightId")`)
    await queryRunner.query(`CREATE TABLE "temporary_Contact" ("id" varchar PRIMARY KEY NOT NULL, "uri" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), "contactTypeId" varchar NOT NULL, CONSTRAINT "FK_a992c5cdc48d0bc105d0338f982" FOREIGN KEY ("contactTypeId") REFERENCES "ContactType" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`)
    await queryRunner.query(`INSERT INTO "temporary_Contact"("id", "uri", "created_at", "last_updated_at", "contactTypeId") SELECT "id", "uri", "created_at", "last_updated_at", "contactTypeId" FROM "Contact"`)
    await queryRunner.query(`DROP TABLE "Contact"`)
    await queryRunner.query(`ALTER TABLE "temporary_Contact" RENAME TO "Contact"`)
    await queryRunner.query(`CREATE TABLE "temporary_Identity" ("id" varchar PRIMARY KEY NOT NULL, "alias" varchar(255) NOT NULL, "roles" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "last_updated_at" datetime NOT NULL DEFAULT (datetime('now')), "contactId" varchar, CONSTRAINT "UQ_Alias" UNIQUE ("alias"), CONSTRAINT "FK_70ac2a54e2041b7914613204e3d" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`)
    await queryRunner.query(`INSERT INTO "temporary_Identity"("id", "alias", "roles", "created_at", "last_updated_at", "contactId") SELECT "id", "alias", "roles", "created_at", "last_updated_at", "contactId" FROM "Identity"`)
    await queryRunner.query(`DROP TABLE "Identity"`)
    await queryRunner.query(`ALTER TABLE "temporary_Identity" RENAME TO "Identity"`)
    await queryRunner.query(`CREATE TABLE "temporary_Connection" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( "type" IN ('OIDC','SIOPv2','SIOPv2+OpenID4VP') ) NOT NULL, "identityId" varchar, CONSTRAINT "REL_Connection_identityId" UNIQUE ("identityId"), CONSTRAINT "FK_fff3668c112a6863bb8c37519a0" FOREIGN KEY ("identityId") REFERENCES "Identity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`)
    await queryRunner.query(`INSERT INTO "temporary_Connection"("id", "type", "identityId") SELECT "id", "type", "identityId" FROM "Connection"`)
    await queryRunner.query(`DROP TABLE "Connection"`)
    await queryRunner.query(`ALTER TABLE "temporary_Connection" RENAME TO "Connection"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
