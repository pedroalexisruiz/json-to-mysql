import { Injectable } from '@nestjs/common';
import { LeaderBoardLineDto } from '../dtos/LeaderBoardLine';
import { SessionDto } from '../dtos/Session';
import { SessionFactory } from '../factories/session.factory';
import { Car } from '../model/Car';
import { Driver } from '../model/Driver';
import { Session } from '../model/Session';
import { CarService } from './car.service';
import { DriverService } from './driver.service';
import { SessionService } from './session.service';
const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');

@Injectable()
export class ReadJsonService extends EventEmitter {
  constructor(
    private sessionService: SessionService,
    private carService: CarService,
    private driverService: DriverService,
    private sessionFactory: SessionFactory,
  ) {
    super();
  }
  watchFolder(folder) {
    try {
      const watcher = chokidar.watch(folder, {
        persistent: true,
        ignored: /entrylist/,
      });
      watcher.on('add', async (filePath) => {
        console.log(
          `[${new Date().toLocaleString()}] ${filePath} has been added.`,
        );
        const fileName = filePath.split('\\')[1];
        // Read content of new file
        const fileContent = await fsExtra.readFile(filePath, 'utf8');
        const sessionDto: SessionDto = JSON.parse(fileContent);
        let session: Session = await this.sessionService.findOne(
          sessionDto.sessionIndex,
        );
        if (!session) {
          await this.saveSessionReport(sessionDto, fileName);
          this.emit('file-added', {
            message: fileContent.toString(),
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async saveSessionReport(
    sessionDto: SessionDto,
    fileName: string,
  ): Promise<void> {
    const { cars, drivers } = this.extractCarsAndDrivers(
      sessionDto.sessionResult.leaderBoardLines,
    );
    const session = this.sessionFactory.toModel(sessionDto, fileName);
    await this.carService.saveAll(cars);
    await this.driverService.saveAll(drivers);
    await this.sessionService.save(session);
  }
  extractCarsAndDrivers(leaderBoardLines: LeaderBoardLineDto[]): {
    cars: Car[];
    drivers: Driver[];
  } {
    const carsMap = new Map<number, Car>();
    const driversMap = new Map<string, Driver>();

    leaderBoardLines.forEach((liderBoardLine) => {
      carsMap.set(liderBoardLine.car.carId, liderBoardLine.car);
      driversMap.set(
        liderBoardLine.currentDriver.playerId,
        liderBoardLine.currentDriver,
      );
    });

    return {
      cars: [...carsMap.values()],
      drivers: [...driversMap.values()],
    };
  }
}
