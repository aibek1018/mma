import { Test, TestingModule } from '@nestjs/testing';
import { RankingResolver } from './ranking.resolver';
import { RankingService } from './ranking.service';

describe('RankingResolver', () => {
  let resolver: RankingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankingResolver, RankingService],
    }).compile();

    resolver = module.get<RankingResolver>(RankingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
