import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFighterToFightInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
