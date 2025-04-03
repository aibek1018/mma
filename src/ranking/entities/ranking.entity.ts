import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Fighter} from "../../fighter/entities/fighter.entity";
import {WeightClass} from "../../weight-class/entities/weight-class.entity";

@Entity()
@ObjectType()
export class Ranking {

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Field(type => WeightClass)
  @ManyToOne(() => WeightClass, weightClass=> weightClass.rankings, { onDelete: "SET NULL" })
  @JoinColumn({ name: 'weightClassId' })
  weightClass: WeightClass

  @OneToMany(() => Fighter, fighter => fighter.ranking)
  @Field(type => [Fighter])
  fighters?: Fighter[];

  @Column({ default: 0 })
  @Field(type => Int)
  rank: number;
}
