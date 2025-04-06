import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Event } from '../entities/event.entity';

@ObjectType()
export class UpcomingEventsResponse {
  @Field(() => [Event])
  events: Event[];

  @Field(() => Int)
  total: number;
}