import {Field, Int, ObjectType} from "@nestjs/graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Ranking} from "../../ranking/entities/ranking.entity";
import {WeightClass} from "../../weight-class/entities/weight-class.entity";
import {FighterToFight} from "../../fighter-to-fight/entities/fighter-to-fight.entity";

@Entity()
@ObjectType()
export class Fighter {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ unique: true })
    @Field()
    fullName: string;

    @Column()
    @Field()
    nationality: string;

    @Column()
    @Field()
    team: string;

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

    @CreateDateColumn()
    @Field()
    createdAt: Date;


    @Field(type => Ranking)
    @ManyToOne(() => Ranking, ranking=> ranking.fighters, { onDelete: "SET NULL" })
    @JoinColumn({ name: 'rankingId' })
    ranking?: Ranking


    @Field(type => WeightClass)
    @ManyToOne(() => WeightClass, weightClass=> weightClass.fighters, { onDelete: "SET NULL" })
    @JoinColumn({ name: 'weightClassId' })
    weightClass?: WeightClass

    @OneToMany(() => FighterToFight, fighterToFight => fighterToFight.fighter)
    fighterToFights: FighterToFight[];

}