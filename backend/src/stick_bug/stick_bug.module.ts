import { Module } from '@nestjs/common';
import { DataGateway } from './stick_bug.gateway';

@Module({
  providers: [DataGateway],
})
export class StickBugModule {}
