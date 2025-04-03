import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Fighter} from "../../fighter/entities/fighter.entity";
import {Ranking} from "../../ranking/entities/ranking.entity";

@Entity()
@ObjectType()
export class WeightClass {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  name: string;

  @OneToMany(() => Fighter, fighter => fighter.weightClass)
  @Field(type => [Fighter])
  fighters?: Fighter[];

  @OneToMany(() => Ranking, ranking => ranking.weightClass)
  @Field(type => [Ranking])
  rankings?: Ranking[];
}
