import { Test, TestingModule } from '@nestjs/testing';
import { StickBugGateway } from './stick_bug.gateway';
import { StickBugService } from './stick_bug.service';

describe('StickBugGateway', () => {
  let gateway: StickBugGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickBugGateway, StickBugService],
    }).compile();

    gateway = module.get<StickBugGateway>(StickBugGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
