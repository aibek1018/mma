import { Injectable } from '@nestjs/common';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';

@Injectable()
export class RankingService {
  create(createRankingInput: CreateRankingInput) {
    return 'This action adds a new ranking';
  }

  findAll() {
    return `This action returns all ranking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ranking`;
  }

  update(id: number, updateRankingInput: UpdateRankingInput) {
    return `This action updates a #${id} ranking`;
  }

  remove(id: number) {
    return `This action removes a #${id} ranking`;
  }
}
