import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Fight} from "../../fight/entities/fight.entity";


@ObjectType()
@Entity()
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name?: string;

  @Field()
  @Column()
  location?: string;

  @Field()
  @Column('date')
  date?: string;

  @OneToMany(() => Fight, fight => fight.event)
  @Field(type => [Fight])
  fights: Fight[];
}