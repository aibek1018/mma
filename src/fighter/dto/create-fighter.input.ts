import {IsAlpha, IsNotEmpty, IsOptional, Min} from "class-validator";
import {Field, InputType, Int} from "@nestjs/graphql";
import {WeightClass} from "../../utils/enums";

@InputType()
export class CreateFighterInput {
    @Field()
    @IsNotEmpty({ message:'Имя не может быть пустым'})
    name: string;

    @Field()
    @IsNotEmpty()
    nationality: string;

    @Field()
    @IsNotEmpty()
    team: string;

    @Field()
    @IsNotEmpty()
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
}