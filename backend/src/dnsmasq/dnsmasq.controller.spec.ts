import { Test, TestingModule } from '@nestjs/testing';
import { DnsmasqController } from './dnsmasq.controller';

describe('DnsmasqController', () => {
  let controller: DnsmasqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DnsmasqController],
    }).compile();

    controller = module.get<DnsmasqController>(DnsmasqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
