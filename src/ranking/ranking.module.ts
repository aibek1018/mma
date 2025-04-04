import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingResolver } from './ranking.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ranking} from "./entities/ranking.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Ranking])],
  providers: [RankingResolver, RankingService],
})
export class RankingModule {}
