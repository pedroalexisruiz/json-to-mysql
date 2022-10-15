import { Injectable } from '@nestjs/common';
import { AC1CarDTO } from 'src/ac1/dtos';
import { AC1Car } from 'src/ac1/model/';

@Injectable()
export class AC1CarFactory {
  constructor() {}

  toModel(carDto: AC1CarDTO, sessionId: number): AC1Car {
    return {
      ...carDto,
      sessionId,
      guid: carDto.Driver.Guid,
    };
  }
}
