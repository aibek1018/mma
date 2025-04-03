import { Test, TestingModule } from '@nestjs/testing';
import { FightResolver } from './fight.resolver';
import { FightService } from './fight.service';

describe('FightResolver', () => {
  let resolver: FightResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FightResolver, FightService],
    }).compile();

    resolver = module.get<FightResolver>(FightResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
