import { Module } from '@nestjs/common';
import { FighterToFightService } from './fighter-to-fight.service';
import { FighterToFightResolver } from './fighter-to-fight.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FighterToFight} from "./entities/fighter-to-fight.entity";

@Module({
  imports:[TypeOrmModule.forFeature([FighterToFight])],
  providers: [FighterToFightResolver, FighterToFightService],
})
export class FighterToFightModule {}
