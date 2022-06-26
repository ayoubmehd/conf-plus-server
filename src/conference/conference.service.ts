import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { Conference, ConferenceDocument } from './conference.schema';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';

@Injectable()
export class ConferenceService {
  constructor(
    @InjectModel(Conference.name) private model: Model<ConferenceDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOne(id: string): Promise<Conference | null> {
    const conf = await this.model.findById(id).exec();

    await conf.populate('users');

    return conf;
  }

  async create(confDto: CreateConferenceDto): Promise<Conference> {
    const conf = await (await this.model.create(confDto)).populate('users');

    return conf;
  }

  async findAll(): Promise<Conference[]> {
    return this.model.find().populate('users').exec();
  }

  async update(id: string, confDto: UpdateConferenceDto): Promise<Conference> {
    const conf = await this.model.findById(id).exec();

    conf.date = new Date(confDto.date);
    conf.users = await this.userModel.where('_id').in(confDto.users).exec();

    await conf.save();

    return conf;
  }

  async remove(id: string): Promise<Conference | null> {
    return this.model.findByIdAndRemove(id).exec();
  }
}
