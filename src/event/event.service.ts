import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Event} from "./entities/event.entity";
import {CreateFighterInput} from "../fighter/dto/create-fighter.input";
import {Fighter} from "../fighter/entities/fighter.entity";
import { UpcomingEventsInput } from './dto/upcoming-events.input';

@Injectable()
export class EventService {

  constructor(@InjectRepository(Event) private eventRepository: Repository<Event>,) {
  }
  async create(createEventInput: CreateEventInput): Promise<Event> {
    const event = await this.eventRepository.create(createEventInput);
    return this.eventRepository.save(event);
  }

 async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`No event found with id ${id}`);
    }
    return event;
  }

  async update(id: number, updateEventInput: UpdateEventInput): Promise<Event> {
      const event = await this.eventRepository.findOne({ where: { id } });

      if (!event) {
          throw new NotFoundException(`No event found with id ${id}`);
      }
      await this.eventRepository.update(id, updateEventInput);

      return this.findOne(id);
  }

   async remove(id: number): Promise<boolean> {
       const event = await this.eventRepository.findOne({ where: { id } });
       if (!event) {
           return false;
       }
       await this.eventRepository.remove(event);
       return true;
  }

  async getUpcomingEvents(input: UpcomingEventsInput) {
    const { search, skip = 0, take = 10 } = input;
  
    const query = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.fights', 'fight')
      .leftJoinAndSelect('fight.fighter1', 'fighter1')
      .leftJoinAndSelect('fight.fighter2', 'fighter2')
      .where('event.date > CURRENT_DATE');
  
    if (search) {
      query.andWhere(
        '(event.name ILIKE :search OR event.location ILIKE :search)',
        { search: `%${search}%` }
      );
    }
  
    const [events, total] = await query
      .orderBy('event.date', 'ASC')
      .skip(skip)
      .take(take)
      .getManyAndCount();
  
    return { events, total };

}
}
