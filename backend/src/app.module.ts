import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StickBugModule } from './stick_bug/stick_bug.module';

@Module({
  imports: [StickBugModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
