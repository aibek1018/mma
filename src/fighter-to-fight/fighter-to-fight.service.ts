import { Injectable } from '@nestjs/common';
import { CreateFighterToFightInput } from './dto/create-fighter-to-fight.input';
import { UpdateFighterToFightInput } from './dto/update-fighter-to-fight.input';

@Injectable()
export class FighterToFightService {
  create(createFighterToFightInput: CreateFighterToFightInput) {
    return 'This action adds a new fighterToFight';
  }

  findAll() {
    return `This action returns all fighterToFight`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fighterToFight`;
  }

  update(id: number, updateFighterToFightInput: UpdateFighterToFightInput) {
    return `This action updates a #${id} fighterToFight`;
  }

  remove(id: number) {
    return `This action removes a #${id} fighterToFight`;
  }
}
