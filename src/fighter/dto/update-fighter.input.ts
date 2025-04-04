import {IsAlpha, IsOptional, Min} from "class-validator";
import {Field, InputType, Int} from "@nestjs/graphql";
import {WeightClass} from "../../utils/enums";

@InputType()
export class UpdateFighterInput {
    @Field()
    @IsOptional()
    name?: string;

    @Field()
    @IsOptional()
    nationality?: string;

    @Field()
    @IsOptional()
    team?: string;

    @Field()
    @IsOptional()
    weightClass?: WeightClass;

    @Field(type => Int, { nullable: true})
    @Min(0)
    @IsOptional()
    wins?: number;

    @Field(type => Int, { nullable: true })
    @Min(0)
    @IsOptional()
    losses?: number;

    @Field(type => Int, { nullable: true })
    @Min(0)
    @IsOptional()
    draws?: number;

    @Field(type => Int, { nullable: true})
    @Min(0)
    @IsOptional()
    knockouts?: number;

    @Field(type => Int, { nullable: true })
    @Min(0)
    @IsOptional()
    submissions?: number;

    @Field(type => Int, { nullable: true })
    @Min(0)
    @IsOptional()
    decisionOfJudge?: number;
}