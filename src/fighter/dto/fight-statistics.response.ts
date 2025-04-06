import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Fight } from '../../fight/entities/fight.entity';

@ObjectType()
export class FightStatisticsResponse {
  @Field(() => [Fight])
  fights: Fight[];

  @Field(() => Int)
  total: number;
}