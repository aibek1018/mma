import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WeightClassService } from './weight-class.service';
import { WeightClass } from './entities/weight-class.entity';
import { CreateWeightClassInput } from './dto/create-weight-class.input';
import { UpdateWeightClassInput } from './dto/update-weight-class.input';

@Resolver(() => WeightClass)
export class WeightClassResolver {
  constructor(private readonly weightClassService: WeightClassService) {}

  @Mutation(() => WeightClass)
  createWeightClass(@Args('createWeightClassInput') createWeightClassInput: CreateWeightClassInput) {
    return this.weightClassService.create(createWeightClassInput);
  }

  @Query(() => [WeightClass], { name: 'weightClass' })
  findAll() {
    return this.weightClassService.findAll();
  }

  @Query(() => WeightClass, { name: 'weightClass' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.weightClassService.findOne(id);
  }

  @Mutation(() => WeightClass)
  updateWeightClass(@Args('updateWeightClassInput') updateWeightClassInput: UpdateWeightClassInput) {
    return this.weightClassService.update(updateWeightClassInput.id, updateWeightClassInput);
  }

  @Mutation(() => WeightClass)
  removeWeightClass(@Args('id', { type: () => Int }) id: number) {
    return this.weightClassService.remove(id);
  }
}
