import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {FighterService} from "./fighter.service";
import {Fighter} from "./entities/fighter.entity";
import {CreateFighterInput} from "./dto/create-fighter.input";


@Resolver()
export class FighterResolver {
    constructor(private fighterService: FighterService) {
    }

    @Mutation(resolve => Fighter)
    createFighter(@Args('createFighterInput') createFighterInput: CreateFighterInput): Promise<Fighter> {
        return this.fighterService.createFighter(createFighterInput);
    }

    @Query(returns => [Fighter])
    getFighters(): Promise<Fighter[]> {
        return this.fighterService.findAll();
    }
    @Query(returns => Fighter)
    getFighter(@Args('fullName', {type: () => String}) fullName: string): Promise<Fighter> {
        return this.fighterService.findOne(fullName);

    }
}
