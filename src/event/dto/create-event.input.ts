import { InputType, Field } from '@nestjs/graphql';
import {IsNotEmpty, Matches} from "class-validator";

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty({ message:'The name cannot be empty.'})
  name: string;

  @Field()
  @IsNotEmpty({ message:'The location cannot be empty.'})
  location: string;

  @Field()
  @IsNotEmpty({ message: 'The location cannot be empty.' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD.',
  })
  date: string;

}
