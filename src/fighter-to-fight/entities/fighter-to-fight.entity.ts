import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Fighter} from "../../fighter/entities/fighter.entity";
import {Fight} from "../../fight/entities/fight.entity";

@Entity()
@ObjectType()
export class FighterToFight {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Fight)
  @ManyToOne(() => Fight, fight => fight.fighterToFights)
  @JoinColumn({ name: 'fight_id' })
  fight?: Fight;

  @Field(type => Fighter)
  @ManyToOne(() => Fighter, fighter => fighter.fighterToFights)
  @JoinColumn({ name: 'fighter_id' })
  fighter?: Fighter;

  @Field({nullable: true})
  @Column({nullable: true})
  result?: string;

  @Field({nullable: true})
  @Column({nullable: true})
  solution?:string
}
