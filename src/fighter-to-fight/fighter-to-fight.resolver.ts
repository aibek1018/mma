import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FighterToFightService } from './fighter-to-fight.service';
import { FighterToFight } from './entities/fighter-to-fight.entity';
import { CreateFighterToFightInput } from './dto/create-fighter-to-fight.input';
import { UpdateFighterToFightInput } from './dto/update-fighter-to-fight.input';

@Resolver(() => FighterToFight)
export class FighterToFightResolver {
  constructor(private readonly fighterToFightService: FighterToFightService) {}

  @Mutation(() => FighterToFight)
  createFighterToFight(@Args('createFighterToFightInput') createFighterToFightInput: CreateFighterToFightInput) {
    return this.fighterToFightService.create(createFighterToFightInput);
  }

  @Query(() => [FighterToFight], { name: 'fighterToFight' })
  findAll() {
    return this.fighterToFightService.findAll();
  }

  @Query(() => FighterToFight, { name: 'fighterToFight' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fighterToFightService.findOne(id);
  }

  @Mutation(() => FighterToFight)
  updateFighterToFight(@Args('updateFighterToFightInput') updateFighterToFightInput: UpdateFighterToFightInput) {
    return this.fighterToFightService.update(updateFighterToFightInput.id, updateFighterToFightInput);
  }

  @Mutation(() => FighterToFight)
  removeFighterToFight(@Args('id', { type: () => Int }) id: number) {
    return this.fighterToFightService.remove(id);
  }
}
