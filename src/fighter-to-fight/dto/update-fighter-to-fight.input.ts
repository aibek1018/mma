import { CreateFighterToFightInput } from './create-fighter-to-fight.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFighterToFightInput extends PartialType(CreateFighterToFightInput) {
  @Field(() => Int)
  id: number;
}
