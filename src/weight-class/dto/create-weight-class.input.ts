import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateWeightClassInput {
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  @IsEnum(["LIGHT" ,"AVERAGE", "HEAVY"],{
    message: 'Valid name reqiured'
  })
  name: "LIGHT" | "AVERAGE" | "HEAVY";
}
