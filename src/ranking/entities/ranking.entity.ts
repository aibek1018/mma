import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Fighter} from "../../fighter/entities/fighter.entity";
import {WeightClass} from "../../utils/enums";

@Entity()
@ObjectType()
export class Ranking {

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @ManyToOne(() => Fighter, (fighter) => fighter.rankings)
  @Field(type => Fighter)
  @JoinColumn({ name: 'fighterId' })
  fighter: Fighter;

  @Field()
  @Column({
    type: 'enum',
    enum: WeightClass,
  })
  weightClass: WeightClass;

  @Column({ default: 0 })
  @Field(type => Int)
  rank: number;
}
