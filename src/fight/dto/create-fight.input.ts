import { InputType, Int, Field } from '@nestjs/graphql';
import {IsNotEmpty, IsOptional, Min} from "class-validator";
import {Status} from "../../utils/enums";

@InputType()
export class CreateFightInput {

  @Field(type => Int)
  @IsNotEmpty()
  fighter1Id: number;

  @Field(type => Int)
  @IsNotEmpty()
  fighter2Id: number;

  @Field(type => Int)
  @IsNotEmpty()
  eventId: number;

  @Field({defaultValue:'scheduled'})
  @IsNotEmpty()
  status: Status;



}
