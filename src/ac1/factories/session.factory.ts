import { Injectable } from '@nestjs/common';
import { AC1SessionDTO } from 'src/ac1/dtos';
import { AC1Session } from 'src/ac1/model';

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
