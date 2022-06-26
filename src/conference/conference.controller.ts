import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';

@Controller('conferences')
export class ConferenceController {
  constructor(private readonly conferenceService: ConferenceService) {}

  @Get()
  findAll() {
    return this.conferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conferenceService.findOne(id);
  }

  @Post()
  create(@Body() createConferenceDto: CreateConferenceDto) {
    return this.conferenceService.create(createConferenceDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConferenceDto: UpdateConferenceDto,
  ) {
    return this.conferenceService.update(id, updateConferenceDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conferenceService.remove(id);
  }
}
