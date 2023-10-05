import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StickBugModule } from './stick_bug/stick_bug.module';
import { DnsmasqService } from './dnsmasq/dnsmasq.service';
import { DnsmasqController } from './dnsmasq/dnsmasq.controller';

@Module({
  imports: [StickBugModule], // Fügen Sie DnsmasqModule hinzu
  controllers: [AppController, DnsmasqController],
  providers: [AppService, DnsmasqService],
})
export class AppModule {}
