const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/src/app.module');
const { InstagramService } = require('./dist/src/instagram/instagram.service');

async function main() {
  console.log("Bootstrapping NestJS application context...");
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(InstagramService);
  console.log("Calling getConversations('default-user')...");
  const convs = await service.getConversations('default-user');
  console.log("Conversations returned:", JSON.stringify(convs, null, 2));
  await app.close();
}

main().catch(console.error);
