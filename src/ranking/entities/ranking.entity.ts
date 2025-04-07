import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Fighter} from "../../fighter/entities/fighter.entity";
import {WeightClass} from "../../utils/enums";

@Entity()
@ObjectType()
export class Ranking {

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @OneToOne(() => Fighter, (fighter) => fighter.ranking)
  @JoinColumn()
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
