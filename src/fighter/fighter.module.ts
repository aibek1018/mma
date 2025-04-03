import { Module } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { FighterResolver } from './fighter.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Fighter} from "./entities/fighter.entity";
import {WeightClassModule} from "../weight-class/weight-class.module";

@Module({
  imports:[TypeOrmModule.forFeature([Fighter]), WeightClassModule],
  providers: [FighterService, FighterResolver]
})
export class FighterModule {}
