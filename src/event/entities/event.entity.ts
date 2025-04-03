import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Fight} from "../../fight/entities/fight.entity";


@ObjectType()
@Entity()
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @CreateDateColumn()
  date: Date;

  @OneToMany(() => Fight, fight => fight.event)
  fights: Fight[];
}