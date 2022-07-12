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
      const watcher = chokidar.watch(folder, { persistent: true });
      watcher.on('add', async (filePath) => {
        console.log(
          `[${new Date().toLocaleString()}] ${filePath} has been added.`,
        );
        // Read content of new file
        const fileContent = await fsExtra.readFile(filePath, 'utf8');
        const sessionDto: SessionDto = JSON.parse(fileContent);
        const { cars, drivers } = this.extractCarsAndDrivers(
          sessionDto.sessionResult.leaderBoardLines,
        );
        const session: Session = this.sessionFactory.toModel(sessionDto);
        this.carService.saveAll(cars);
        this.driverService.saveAll(drivers);
        this.sessionService.save(session);

        // emit an event when new file has been added
        this.emit('file-added', {
          message: fileContent.toString(),
        });
      });
    } catch (error) {
      console.log(error);
    }
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
