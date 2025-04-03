import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWeightClassInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
