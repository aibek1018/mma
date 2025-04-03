import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingResolver } from './ranking.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Fighter} from "../fighter/entities/fighter.entity";
import {WeightClassModule} from "../weight-class/weight-class.module";
import {Ranking} from "./entities/ranking.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Ranking])],
  providers: [RankingResolver, RankingService],
})
export class RankingModule {}
