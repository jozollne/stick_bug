import { Test, TestingModule } from '@nestjs/testing';
import { StickBugService } from './stick_bug.service';

describe('StickBugService', () => {
  let service: StickBugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickBugService],
    }).compile();

    service = module.get<StickBugService>(StickBugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
