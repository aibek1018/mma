import { Test, TestingModule } from '@nestjs/testing';
import { FighterToFightService } from './fighter-to-fight.service';

describe('FighterToFightService', () => {
  let service: FighterToFightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FighterToFightService],
    }).compile();

    service = module.get<FighterToFightService>(FighterToFightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
