import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Event} from "../../event/entities/event.entity";
import {Fighter} from "../../fighter/entities/fighter.entity";
import {MethodOfVictory, Status} from "../../utils/enums";

@ObjectType()
@Entity()
export class Fight {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Fighter)
  @ManyToOne(() => Fighter, (fighter) => fighter.fights1)
  @JoinColumn({ name: 'fighter1Id' })
  fighter1: Fighter;

  @Field(type => Fighter)
  @ManyToOne(() => Fighter, (fighter) => fighter.fights2)
  @JoinColumn({ name: 'fighter2Id' })
  fighter2: Fighter;

  @Field(type => Event)
  @ManyToOne(() => Event, event => event.fights)
  @JoinColumn({ name: 'eventId' })
  event: Event;


  @Field(type => Int)
  @Column({ nullable: true })
  winnerId?: number;

  @Field(type => Int)
  @Column({ nullable: true })
  draw?: number;

  @Field()
  @Column({
    type: 'enum',
    enum: MethodOfVictory,
    nullable: true,
  })
  method?: MethodOfVictory;

  @Field()
  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @Field(type => Int)
  @Column({ nullable: true })
  round?: number;

  @Field()
  @Column({ nullable: true })
  time?: string;

}
