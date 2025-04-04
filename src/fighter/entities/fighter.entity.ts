import {Field, Int, ObjectType} from "@nestjs/graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Ranking} from "../../ranking/entities/ranking.entity";
import {Fight} from "../../fight/entities/fight.entity";
import {WeightClass} from "../../utils/enums";

@Entity()
@ObjectType()
export class Fighter {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ unique: true})
    @Field()
    name: string;

    @Column()
    @Field()
    nationality: string;

    @Column()
    @Field()
    team: string;

    @Field()
    @Column({
        type: 'enum',
        enum: WeightClass,
    })
    weightClass: WeightClass;

    @Column({ default: 0 })
    @Field(type => Int)
    wins?: number;

    @Column({ default: 0 })
    @Field(type => Int)
    losses?: number;

    @Column({ default: 0 })
    @Field(type => Int)
    draws?: number;

    @Column({ default: 0 })
    @Field(type => Int)
    knockouts?: number;

    @Column({ default: 0 })
    @Field(type => Int)
    submissions?: number;

    @Column({ default: 0 })
    @Field(type => Int)
    decisionOfJudge?: number;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @OneToMany(() => Fight, (fight) => fight.fighter1)
    @Field(type => [Fight])
    fights1: Fight[];

    @OneToMany(() => Fight, (fight) => fight.fighter2)
    @Field(type => [Fight])
    fights2: Fight[];

    @OneToMany(() => Ranking, (ranking) => ranking.fighter)
    @Field(type => [Ranking])
    rankings: Ranking[];


}