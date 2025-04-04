import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRankingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
