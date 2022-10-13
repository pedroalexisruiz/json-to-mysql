import { Injectable } from '@nestjs/common';
import { AC1CarDTO } from 'src/read-json/dtos/ac1/AC1CarDTO';
import { AC1Car } from 'src/read-json/model/ac1/AC1Car';
import { AC1Session } from 'src/read-json/model/ac1/AC1Session';

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
