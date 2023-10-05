import { Test, TestingModule } from '@nestjs/testing';
import { DnsmasqService } from './dnsmasq.service';

describe('DnsmasqService', () => {
  let service: DnsmasqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DnsmasqService],
    }).compile();

    service = module.get<DnsmasqService>(DnsmasqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
