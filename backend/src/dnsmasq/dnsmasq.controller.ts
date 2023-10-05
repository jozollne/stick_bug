import { Controller, Get } from '@nestjs/common';
import { DnsmasqService } from './dnsmasq.service';

@Controller('dnsmasq')
export class DnsmasqController {
    constructor(private readonly dnsmasqService: DnsmasqService) {}

    @Get('leases')
    getLeases() {
        return this.dnsmasqService.getLeases();
    }
}
