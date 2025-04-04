import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateFightInput} from './dto/create-fight.input';
import {UpdateFightInput} from './dto/update-fight.input';
import {InjectRepository} from "@nestjs/typeorm";
import {FindOptionsWhere, In, Repository} from "typeorm";
import {Fight} from "./entities/fight.entity";
import {Fighter} from "../fighter/entities/fighter.entity";
import {Event} from "../event/entities/event.entity";
import {Ranking} from "../ranking/entities/ranking.entity";
import {MethodOfVictory, Status} from "../utils/enums";

@Injectable()
export class FightService {

    constructor(@InjectRepository(Fight) private fightRepository: Repository<Fight>,
                @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
                @InjectRepository(Event) private eventRepository: Repository<Event>,
                @InjectRepository(Ranking) private rankingRepository: Repository<Ranking>) {
    }

    async create(createFightInput: CreateFightInput): Promise<Fight> {
        const [fighter1, fighter2] = await this.fighterRepository.find({
            where: { id: In([createFightInput.fighter1Id, createFightInput.fighter2Id]) },
        });

        if (!fighter1 || !fighter2) {
            throw new NotFoundException(`One or both fighters don't exist.`);
        }

        if (fighter1.weightClass !== fighter2.weightClass) {
            throw new NotFoundException(`The fighter weightClass do not match`);
        }

        const event = await this.eventRepository.findOne({
            where: { id: createFightInput.eventId },
        });

        if (!event) {
            throw new NotFoundException(`No event found with id ${createFightInput.eventId}`);
        }

        const existingFights = await this.fightRepository.find({
            where: [
                {
                    event: { id: createFightInput.eventId },
                    fighter1: { id: createFightInput.fighter1Id },
                },
                {
                    event: { id: createFightInput.eventId },
                    fighter2: { id: createFightInput.fighter1Id },
                },
                {
                    event: { id: createFightInput.eventId },
                    fighter1: { id: createFightInput.fighter2Id },
                },
                {
                    event: { id: createFightInput.eventId },
                    fighter2: { id: createFightInput.fighter2Id },
                },
            ] as FindOptionsWhere<Fight>[],
            relations: ['fighter1', 'fighter2', 'event'],
        });

        if (existingFights.length > 0) {
            throw new BadRequestException(`One of the fighters is already assigned to a fight in this event.`);
        }


        const fight = this.fightRepository.create({
            status: createFightInput.status,
            fighter1,
            fighter2,
            event,
        });

        await this.fightRepository.save(fight);

        return this.fightRepository.findOneOrFail({
            where: { id: fight.id },
            relations: ['fighter1', 'fighter2', 'event'],
        });
    }

    findAll(): Promise<Fight[]> {
        return this.fightRepository.find({
            relations: ['fighter1', 'fighter2', 'event'],
        });
    }

    async findOne(id: number): Promise<Fight> {
        const fight = await this.fightRepository.findOne({
            where: { id },
            relations: ['fighter1', 'fighter2', 'event'],
        });

        if (!fight) {
            throw new NotFoundException(`Fight with id ${id} not found`);
        }

        return fight;
    }

    remove(id: number) {
        return `This action removes a #${id} fight`;
    }

    async update(id: number, updateFightInput: UpdateFightInput): Promise<Fight> {
        const fight = await this.fightRepository.findOne({
            where: { id },
            relations: ['fighter1', 'fighter2'],
        });

        if (!fight) {
            throw new NotFoundException(`Fight with id ${id} not found`);
        }

        const { fighter1, fighter2 } = fight;
        const { winnerId, draw, method, round, time } = updateFightInput;

        if (winnerId) {
            if (winnerId === fighter1.id) {
                fighter1.wins = (fighter1.wins || 0) + 1;
                fighter2.losses = (fighter2.losses || 0) + 1
            } else if (winnerId === fighter2.id) {
                fighter2.wins = (fighter2.wins || 0) + 1;
                fighter1.losses = (fighter1.losses || 0) + 1;
            }
        }

        if (draw) {
            fight.draw = draw;
            fighter1.draws = (fighter1.draws || 0) + 1;
            fighter2.draws = (fighter2.draws || 0) + 1;
        }

        if (method) {
            fight.method = method;

            if (method === MethodOfVictory.KNOCKOUTS) {
                if (winnerId === fighter1.id) {
                    fighter1.knockouts = (fighter1.knockouts || 0) + 1;
                } else if (winnerId === fighter2.id) {
                    fighter2.knockouts = (fighter2.knockouts || 0) + 1;
                }
            }

            if (method === MethodOfVictory.SUBMISSIONS) {
                if (winnerId === fighter1.id) {
                    fighter1.submissions = (fighter1.submissions || 0) + 1;
                } else if (winnerId === fighter2.id) {
                    fighter2.submissions = (fighter2.submissions || 0) + 1;
                }
            }

            if (method === MethodOfVictory.DECISION_OF_JUDGE) {
                if (winnerId === fighter1.id) {
                    fighter1.decisionOfJudge = (fighter1.decisionOfJudge || 0) + 1;
                } else if (winnerId === fighter2.id) {
                    fighter2.decisionOfJudge = (fighter2.decisionOfJudge || 0) + 1;
                }
            }
        }

        fight.round = round;
        fight.time = time;
        fight.winnerId = winnerId;
        fight.status = Status.COMPLETED

        await this.fightRepository.save(fight);

        await this.fighterRepository.save([fighter1, fighter2]);

        await Promise.all([this.updateRanking(fighter1), this.updateRanking(fighter2)]);

        return fight;
    }

    async updateRanking(fighter: Fighter): Promise<void> {
        const ranking = await this.rankingRepository.findOne({
            where: {
                fighter: { id: fighter.id },
                weightClass: fighter.weightClass,
            },
        });

        if (!ranking) {
            throw new NotFoundException(`Ranking not found for fighter ${fighter.name}`);
        }

        if (fighter.wins && fighter.wins > 0) {
            if (ranking.rank > 1) {
                ranking.rank -= 1;
            }
        } else if (fighter.losses && fighter.losses > 0) {
            ranking.rank += 1;
        }

        await this.rankingRepository.save(ranking);
    }



}
