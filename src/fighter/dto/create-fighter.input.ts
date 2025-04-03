import {IsAlpha, IsNotEmpty, IsOptional, Min} from "class-validator";
import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class CreateFighterInput {
    @Field()
    @IsNotEmpty()
    @IsAlpha()
    fullName: string;

    @Field()
    @IsNotEmpty()
    nationality: string;

    @Field()
    @IsNotEmpty()
    team: string;

    

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
}