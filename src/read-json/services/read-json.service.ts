import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LeaderBoardLineDto } from '../dtos/LeaderBoardLine';
import { SessionDto } from '../dtos/Session';
import { LapFactory } from '../factories/lap.factory';
import { SessionResultFactory } from '../factories/session-result.factory';
import { SessionFactory } from '../factories/session.factory';
import { Car } from '../model/Car';
import { Driver } from '../model/Driver';
import { Session } from '../model/Session';
import { SessionResult } from '../model/SessionResult';
import { CarService } from './car.service';
import { DriverService } from './driver.service';
import { LapService } from './lap.service';
import { SessionResultService } from './session-result.service';
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
    private lapFactory: LapFactory,
    private lapService: LapService,
    private sessionResultFactory: SessionResultFactory,
    private sessionResultService: SessionResultService,
    @Inject('DATA_SOURCE') private datasource: DataSource,
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
        const routeFolders = filePath.split('\\');
        const fileName = routeFolders[routeFolders.length - 1];
        // Read content of new file
        const fileContent = await fsExtra.readFile(filePath, 'utf-16le');
        let session: Session = await this.sessionService.findOne(fileName);

        if (!session) {
          const sessionDto: SessionDto = JSON.parse(fileContent);
          await this.saveSessionReport(sessionDto, fileName);
          // Aqui ejecutas cualquier query
          try {
            // this.datasource.query(
            //   "INSERT INTO `driver` (`player_id`, `first_name`, `last_name`, `short_name`) VALUES ('123', 'Pedro', 'Ruiz', 'Pedroru');",
            // );
          } catch (error) {
            console.log(
              'La query que est{as intentando ejecutar genera un erroe en BD',
            );
          }

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
    let sessionSaved: Session;
    const { cars, drivers } = this.extractCarsAndDrivers(
      sessionDto.sessionResult.leaderBoardLines,
    );
    const session = this.sessionFactory.toModel(sessionDto, fileName);
    await this.carService.bulkSave(cars);
    await this.driverService.bulkSave(drivers);
    sessionSaved = await this.sessionService.save(session);
    const laps = this.lapFactory.bulkToModel(
      sessionDto.laps,
      sessionSaved.sessionId,
    );
    await this.lapService.saveAll(laps);
    const sessionResult: SessionResult = this.sessionResultFactory.toModel(
      sessionDto.sessionResult,
      sessionSaved,
    );
    await this.sessionResultService.save(sessionResult);
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
