import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightService } from './fight.service';
import { Fight } from './entities/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import {Fighter} from "../fighter/entities/fighter.entity";

@Resolver(() => Fight)
export class FightResolver {
  constructor(private readonly fightService: FightService) {}

  @Mutation(() => Fight)
  createFight(@Args('createFightInput') createFightInput: CreateFightInput):Promise<Fight> {
    return this.fightService.create(createFightInput);
  }

  @Query(() => [Fight], { name: 'findAllFights' })
  findAll() : Promise<Fight[]> {
    return this.fightService.findAll();
  }

  @Query(() => Fight, { name: 'findFight' })
  findOne(@Args('id', { type: () => Int }) id: number) : Promise<Fight> {
    return this.fightService.findOne(id);
  }

  @Mutation(() => Fight)
  updateFight(@Args('id', { type: () => Int }) id: number, @Args('updateFightInput') updateFightInput: UpdateFightInput) : Promise<Fight> {
    return this.fightService.update(id, updateFightInput);
  }

  @Mutation(() => Fight)
  removeFight(@Args('id', { type: () => Int }) id: number) {
    return this.fightService.remove(id);
  }
}
