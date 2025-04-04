import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {IsNotEmpty, IsOptional} from "class-validator";
import {MethodOfVictory, Status} from "../../utils/enums";
import {Column} from "typeorm";

@InputType()
export class UpdateFightInput {
  @Field(type => Int)
  @IsOptional()
  winnerId: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  draw?: number;


  @Field({nullable: true})
  @IsOptional()
  method?: MethodOfVictory;

  @Field(type => Int)
  @IsNotEmpty()
  round: number;

  @Field()
  @IsNotEmpty()
  time: string;

  @Field({defaultValue:'completed'})
  @IsNotEmpty()
  status: Status;
}
