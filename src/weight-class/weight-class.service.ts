import { Injectable } from '@nestjs/common';
import { CreateWeightClassInput } from './dto/create-weight-class.input';
import { UpdateWeightClassInput } from './dto/update-weight-class.input';

@Injectable()
export class WeightClassService {
  create(createWeightClassInput: CreateWeightClassInput) {
    return 'This action adds a new weightClass';
  }

  findAll() {
    return `This action returns all weightClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weightClass`;
  }

  update(id: number, updateWeightClassInput: UpdateWeightClassInput) {
    return `This action updates a #${id} weightClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} weightClass`;
  }
}
