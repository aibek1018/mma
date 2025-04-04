import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Fighter} from "./entities/fighter.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateFighterInput} from "./dto/create-fighter.input";
import {UpdateFighterInput} from "./dto/update-fighter.input";

@Injectable()
export class FighterService {
    constructor(@InjectRepository(Fighter) private fighterRepository: Repository<Fighter>) {
    }

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

    async update(id: number, updateFighterInput: UpdateFighterInput): Promise<Fighter> {
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



}
