import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {FighterService} from "./fighter.service";
import {Fighter} from "./entities/fighter.entity";
import {CreateFighterInput} from "./dto/create-fighter.input";
import {UpdateFighterInput} from "./dto/update-fighter.input";
import { FightStatisticsResponse } from './dto/fight-statistics.response';
import { FighterStatisticsInput } from './dto/fighter-statistics.input';


@Resolver()
export class FighterResolver {
    constructor(private fighterService: FighterService) {
    }

    @Mutation(resolve => Fighter)
    createFighter(@Args('createFighterInput') createFighterInput: CreateFighterInput): Promise<Fighter> {
        return this.fighterService.create(createFighterInput);
    }

    @Query(returns => [Fighter], { name: 'findAllFighters' })
    findAll(): Promise<Fighter[]> {
        return this.fighterService.findAll();
    }

    @Query(() => Fighter, { name: 'findFighter' })
    findOne(@Args('id', { type: () => Int }) id: number): Promise<Fighter> {
        return this.fighterService.findOne(id);
    }

    @Mutation(() => Fighter)
    updateFighter(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateFighterInput') updateFighterInput: UpdateFighterInput,
    ): Promise<Fighter> {
        return this.fighterService.update(id, updateFighterInput);
    }

    @Mutation(() => Boolean)
    async removeFighter(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        return this.fighterService.remove(id);
    }

  @Query(() => FightStatisticsResponse)
    async fighterStatistics(
      @Args('input') input: FighterStatisticsInput
    ) {
      return this.fighterService.getFightStatistics(input);
    }
}
