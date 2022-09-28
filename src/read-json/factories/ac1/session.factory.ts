import { Injectable } from '@nestjs/common';
import { AC1SessionDTO } from 'src/read-json/dtos/ac1/AC1SessionDTO';
import { AC1Session } from 'src/read-json/model/ac1/AC1Session';

@Injectable()
export class AC1SessionFactory {
  constructor() {}

  toModel(sessionDto: AC1SessionDTO): AC1Session {
    const { Cars, Events, Laps, Result, ...rest } = sessionDto;
    return {
      ...rest,
    };
  }
}
