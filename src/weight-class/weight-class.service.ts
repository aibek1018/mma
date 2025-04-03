import { Injectable } from '@nestjs/common';
import { CreateWeightClassInput } from './dto/create-weight-class.input';
import { UpdateWeightClassInput } from './dto/update-weight-class.input';
import { WeightClass } from './entities/weight-class.entity';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class WeightClassService {

  constructor(@InjectRepository(WeightClass) private weightClassRepository: Repository<WeightClass>,) {
  }
  create(createWeightClassInput: CreateWeightClassInput): Promise<WeightClass> {
    const weightClass = this.weightClassRepository.create(createWeightClassInput);

    return this.weightClassRepository.save(weightClass);
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

