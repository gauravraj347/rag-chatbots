import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ChatModule } from './modules/chat/chat.module';
import { EmbeddingModule } from './modules/embedding/embedding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ChatModule,
    EmbeddingModule,
  ],
})
export class AppModule {}