import { Field, Int, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class FighterStatisticsInput {
  @Field(() => Int)
  @Min(0)
  fighterId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @Min(0)
  take?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @Min(0)
  skip?: number;
}