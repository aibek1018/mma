import {Module} from '@nestjs/common';
import {FightService} from './fight.service';
import {FightResolver} from './fight.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Fight} from "./entities/fight.entity";
import {Fighter} from "../fighter/entities/fighter.entity";
import {Event} from "../event/entities/event.entity";
import {Ranking} from "../ranking/entities/ranking.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Fight]), TypeOrmModule.forFeature([Fighter]), TypeOrmModule.forFeature([Event]), TypeOrmModule.forFeature([Ranking])],
    providers: [FightResolver, FightService],
})
export class FightModule {
}
