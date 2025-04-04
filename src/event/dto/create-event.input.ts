import { InputType, Int, Field } from '@nestjs/graphql';
import {IsAlpha, IsNotEmpty} from "class-validator";

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty({ message:'Имя не может быть пустым'})
  name: string;

  @Field()
  @IsNotEmpty()
  location: string;

  @Field()
  @IsNotEmpty()
  date: string;

}
