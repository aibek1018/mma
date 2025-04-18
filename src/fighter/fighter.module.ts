import { Module } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { FighterResolver } from './fighter.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Fighter} from "./entities/fighter.entity";
import { Fight } from 'src/fight/entities/fight.entity';
import { Ranking } from 'src/ranking/entities/ranking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Fighter]),TypeOrmModule.forFeature([Fight]),TypeOrmModule.forFeature([Ranking])],
  providers: [FighterService, FighterResolver],
})
export class FighterModule {}
