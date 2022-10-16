import { Module } from '@nestjs/common';
import { RaceDataController } from './controllers/read-race-data.controller';
import { RaceReaderService } from './services/ac1session-reader.service';

@Module({ controllers: [RaceDataController], providers: [RaceReaderService] })
export class Rfactor2Module {}
