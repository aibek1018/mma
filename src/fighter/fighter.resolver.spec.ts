import { Test, TestingModule } from '@nestjs/testing';
import { FighterResolver } from './fighter.resolver';

describe('FighterResolver', () => {
  let resolver: FighterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FighterResolver],
    }).compile();

    resolver = module.get<FighterResolver>(FighterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
