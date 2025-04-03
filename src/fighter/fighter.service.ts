import {Injectable} from '@nestjs/common';
import {Fighter} from "./entities/fighter.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateFighterInput} from "./dto/create-fighter.input";

@Injectable()
export class FighterService {
    constructor(@InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,) {
    }

    async createFighter(createFighterInput: CreateFighterInput): Promise<Fighter> {
        const fighter = this.fighterRepository.create(createFighterInput);

        return this.fighterRepository.save(fighter);

    }

    async findAll(): Promise<Fighter[]> {
        return this.fighterRepository.find();
    }

    async findOne(fullName: string): Promise<Fighter> {
        return this.fighterRepository.findOneOrFail({
            where:{
                fullName
            }
        });
    }
}
