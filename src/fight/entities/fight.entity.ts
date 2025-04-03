import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Event} from "../../event/entities/event.entity";
import {FighterToFight} from "../../fighter-to-fight/entities/fighter-to-fight.entity";

@ObjectType()
@Entity()
export class Fight {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @Field(type => Event)
  @ManyToOne(() => Event, event => event.fights)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @OneToMany(() => FighterToFight, fighterToFight => fighterToFight.fight)
  fighterToFights: FighterToFight[];

}
