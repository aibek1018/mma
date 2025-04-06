import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Fighter } from './entities/fighter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { Fight } from 'src/fight/entities/fight.entity';
import { FighterStatisticsInput } from './dto/fighter-statistics.input';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
  ) {}

  async create(createFighterInput: CreateFighterInput): Promise<Fighter> {
    const fighter = await this.fighterRepository.create(createFighterInput);

    return this.fighterRepository.save(fighter);
  }

  async findAll(): Promise<Fighter[]> {
    return this.fighterRepository.find();
  }

  async findOne(id: number): Promise<Fighter> {
    const fighter = await this.fighterRepository.findOne({ where: { id } });

    if (!fighter) {
      throw new NotFoundException(`No fighter found with id ${id}`);
    }
    return fighter;
  }

  async update(
    id: number,
    updateFighterInput: UpdateFighterInput,
  ): Promise<Fighter> {
    const fighter = await this.fighterRepository.findOne({ where: { id } });

    if (!fighter) {
      throw new NotFoundException(`No fighter found with id ${id}`);
    }

    await this.fighterRepository.update(id, updateFighterInput);

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const fighter = await this.fighterRepository.findOne({ where: { id } });
    if (!fighter) {
      return false;
    }
    await this.fighterRepository.remove(fighter);
    return true;
  }

  async getFightStatistics(input: FighterStatisticsInput) {
    const { fighterId, search, skip = 0, take = 10 } = input;

    const query = this.fightRepository
      .createQueryBuilder('fight')
      .leftJoinAndSelect('fight.event', 'event')
      .leftJoinAndSelect('fight.fighter1', 'fighter1')
      .leftJoinAndSelect('fight.fighter2', 'fighter2')
      .where('fighter1.id = :id OR fighter2.id = :id', { id: fighterId });

    if (search) {
      query.andWhere(
        '(event.name ILIKE :search OR event.location ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [fights, total] = await query
      .orderBy('event.date', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return { fights, total };
  }
}
