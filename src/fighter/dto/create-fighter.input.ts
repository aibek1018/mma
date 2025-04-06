import {IsAlpha, IsEnum, IsNotEmpty, IsOptional, Min} from "class-validator";
import {Field, InputType, Int} from "@nestjs/graphql";
import {WeightClass} from "../../utils/enums";

@InputType()
export class CreateFighterInput {
    @Field()
    @IsNotEmpty({ message:'The name cannot be empty.'})
    name: string;

    @Field()
    @IsNotEmpty({ message:'The nationality cannot be empty.'})
    nationality: string;

    @Field()
    @IsNotEmpty({ message:'The team cannot be empty.'})
    team: string;

    @Field()
    @IsEnum(WeightClass, {
        message: `Weight class must be one of: ${Object.values(WeightClass).join(', ')}.`
    })
    weightClass: WeightClass;

    @Field(type => Int, { nullable: true, defaultValue: 0 })
    @Min(0)
    @IsOptional()
    wins?: number;

    @Field(type => Int, { nullable: true, defaultValue: 0 })
    @Min(0)
    @IsOptional()
    losses?: number;

    @Field(type => Int, { nullable: true, defaultValue: 0 })
    @Min(0)
    @IsOptional()
    draws?: number;

    @Field(type => Int, { nullable: true, defaultValue: 0 })
    @Min(0)
    @IsOptional()
    knockouts?: number;

    @Field(type => Int, { nullable: true, defaultValue: 0 })
    @Min(0)
    @IsOptional()
    submissions?: number;

    @Field(type => Int, { nullable: true, defaultValue: 0 })
    @Min(0)
    @IsOptional()
    decisionOfJudge?: number;

    @Field(type => Int)
    @IsNotEmpty()
    @Min(1, { message: 'Rank must be a positive integer.' })
    rank: number;
}