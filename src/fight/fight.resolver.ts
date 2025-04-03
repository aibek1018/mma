import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightService } from './fight.service';
import { Fight } from './entities/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Resolver(() => Fight)
export class FightResolver {
  constructor(private readonly fightService: FightService) {}

  @Mutation(() => Fight)
  createFight(@Args('createFightInput') createFightInput: CreateFightInput) {
    return this.fightService.create(createFightInput);
  }

  @Query(() => [Fight], { name: 'fight' })
  findAll() {
    return this.fightService.findAll();
  }

  @Query(() => Fight, { name: 'fight' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fightService.findOne(id);
  }

  @Mutation(() => Fight)
  updateFight(@Args('updateFightInput') updateFightInput: UpdateFightInput) {
    return this.fightService.update(updateFightInput.id, updateFightInput);
  }

  @Mutation(() => Fight)
  removeFight(@Args('id', { type: () => Int }) id: number) {
    return this.fightService.remove(id);
  }
}
