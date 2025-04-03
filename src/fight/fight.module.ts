import { Module } from '@nestjs/common';
import { FightService } from './fight.service';
import { FightResolver } from './fight.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Fight} from "./entities/fight.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Fight])],
  providers: [FightResolver, FightService],
})
export class FightModule {}
