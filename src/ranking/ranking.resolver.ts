import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RankingService } from './ranking.service';
import { Ranking } from './entities/ranking.entity';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';

@Resolver(() => Ranking)
export class RankingResolver {
  constructor(private readonly rankingService: RankingService) {}

  @Mutation(() => Ranking)
  createRanking(@Args('createRankingInput') createRankingInput: CreateRankingInput) {
    return this.rankingService.create(createRankingInput);
  }

  @Query(() => [Ranking], { name: 'ranking' })
  findAll() {
    return this.rankingService.findAll();
  }

  @Query(() => Ranking, { name: 'ranking' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rankingService.findOne(id);
  }

  @Mutation(() => Ranking)
  updateRanking(@Args('updateRankingInput') updateRankingInput: UpdateRankingInput) {
    return this.rankingService.update(updateRankingInput.id, updateRankingInput);
  }

  @Mutation(() => Ranking)
  removeRanking(@Args('id', { type: () => Int }) id: number) {
    return this.rankingService.remove(id);
  }
}
