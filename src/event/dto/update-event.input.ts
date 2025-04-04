import { InputType, Field } from '@nestjs/graphql';
import {IsOptional} from "class-validator";

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  date?: string;
}
