import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {EventService} from './event.service';
import {Event} from './entities/event.entity';
import {CreateEventInput} from './dto/create-event.input';
import {UpdateEventInput} from './dto/update-event.input';

@Resolver(() => Event)
export class EventResolver {
    constructor(private readonly eventService: EventService) {
    }

    @Mutation(() => Event)
    createEvent(@Args('createEventInput') createEventInput: CreateEventInput): Promise<Event> {
        return this.eventService.create(createEventInput);
    }

    @Query(() => [Event], {name: 'findAllEvents'})
    findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }

    @Query(() => Event, {name: 'findEvent'})
    findOne(@Args('id', {type: () => Int}) id: number): Promise<Event> {
        return this.eventService.findOne(id);
    }

    @Mutation(() => Event)
    updateEvent(@Args('id', {type: () => Int}) id: number,
                @Args('updateEventInput') updateEventInput: UpdateEventInput): Promise<Event> {
        return this.eventService.update(id, updateEventInput);
    }

    @Mutation(() => Boolean)
    removeEvent(@Args('id', {type: () => Int}) id: number): Promise<boolean> {
        return this.eventService.remove(id);
    }
}
