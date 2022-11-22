import { Injectable } from '@nestjs/common';
import { RF2DriverDTO } from '../dto/RF2Driver';
import { RF2DriverEntity } from '../entities';

@Injectable()
export class RF2DriverFactory {
  constructor() {}

  parseDTOtoModel(driver: RF2DriverDTO): RF2DriverEntity {
    const { Name, SteamID } = driver;
    return {
      Name,
      SteamID: SteamID.toString(),
    };
  }

  bulkDTOToModel(driversDto: RF2DriverDTO[]): RF2DriverEntity[] {
    return driversDto.map((driverDto) => this.parseDTOtoModel(driverDto));
  }
}
