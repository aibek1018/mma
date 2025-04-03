import { Test, TestingModule } from '@nestjs/testing';
import { FighterToFightResolver } from './fighter-to-fight.resolver';
import { FighterToFightService } from './fighter-to-fight.service';

describe('FighterToFightResolver', () => {
  let resolver: FighterToFightResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FighterToFightResolver, FighterToFightService],
    }).compile();

    resolver = module.get<FighterToFightResolver>(FighterToFightResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
