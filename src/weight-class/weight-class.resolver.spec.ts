import { Test, TestingModule } from '@nestjs/testing';
import { WeightClassResolver } from './weight-class.resolver';
import { WeightClassService } from './weight-class.service';

describe('WeightClassResolver', () => {
  let resolver: WeightClassResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightClassResolver, WeightClassService],
    }).compile();

    resolver = module.get<WeightClassResolver>(WeightClassResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
