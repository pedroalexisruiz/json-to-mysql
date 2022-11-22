import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SessionDto } from '../dtos/Session';
import {
  LapFactory,
  LeaderBoardLineFactory,
  SessionResultFactory,
  SessionFactory,
} from '../factories';
import {
  Car,
  Driver,
  LeaderBoardLine,
  Session,
  SessionResult,
} from 'src/acc/model';
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
    private leaderBoardLineFactory: LeaderBoardLineFactory,
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
        const fileName: string = routeFolders[routeFolders.length - 1];
        // Read content of new file
        const fileContent = await fsExtra.readFile(filePath, 'utf-16le');
        if (fileContent) {
          this.generateReport(fileName, fileContent);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async generateReport(fileName: string, fileContent: string) {
    let session: Session = await this.sessionService.findOne(fileName);

    if (!session) {
      try {
        const sessionDto: SessionDto = JSON.parse(fileContent);
        await this.saveSessionReport(sessionDto, fileName);
      } catch (error) {
        console.log(`El archivo ${fileName} tiene un formato incorrecto`);
      }
      this.executeQueries();

      this.emit('file-added', {
        message: fileContent.toString(),
      });
    }
  }

  executeQueries() {
    // Aqui ejecutas las queries
    try {
      // this.datasource.query(
      //   "INSERT INTO `driver` (`player_id`, `first_name`, `last_name`, `short_name`) VALUES ('123', 'Pedro', 'Ruiz', 'Pedroru');",
      // );
    } catch (error) {
      console.log(
        'La query que est{as intentando ejecutar genera un erroe en BD',
      );
    }
  }

  async saveSessionReport(
    sessionDto: SessionDto,
    fileName: string,
  ): Promise<void> {
    let sessionSaved: Session;

    const session = this.sessionFactory.toModel(sessionDto, fileName);
    sessionSaved = await this.sessionService.save(session);
    const leaderBoardLines = sessionDto.sessionResult.leaderBoardLines.map(
      (leaderBoardLineDto, index) =>
        this.leaderBoardLineFactory.toModel(
          leaderBoardLineDto,
          sessionSaved.sessionId,
          index + 1,
        ),
    );

    const { cars, drivers } = this.extractCarsAndDrivers(leaderBoardLines);
    await this.driverService.bulkSave(drivers);
    console.log(
      `Guardé pilotos ${session.sessionType},${session.metaData}, ${session.serverName}`,
    );
    await this.carService.bulkSave(cars);
    console.log(
      `Guardé vehiculos ${session.sessionType},${session.metaData}, ${session.serverName}`,
    );
    const sessionResult: SessionResult = this.sessionResultFactory.toModel(
      sessionDto.sessionResult,
      sessionSaved,
    );
    await this.sessionResultService.save(sessionResult);
    console.log(
      `Guardé resultados ${session.sessionType},${session.metaData}, ${session.serverName}`,
    );
    const laps = this.lapFactory.bulkToModel(
      sessionDto.laps,
      sessionSaved.sessionId,
    );
    await this.lapService.saveAll(laps);
    console.log(
      `Guardé vueltas ${session.sessionType},${session.metaData}, ${session.serverName}`,
    );
  }
  extractCarsAndDrivers(leaderBoardLines: LeaderBoardLine[]): {
    cars: Car[];
    drivers: Driver[];
  } {
    const carsMap = new Map<number, Car>();
    const driversMap = new Map<string, Driver>();

    leaderBoardLines.forEach((liderBoardLine) => {
      carsMap.set(liderBoardLine.car.carId, liderBoardLine.car);
      driversMap.set(
        liderBoardLine.car.driver.playerId,
        liderBoardLine.car.driver,
      );
    });

    return {
      cars: [...carsMap.values()],
      drivers: [...driversMap.values()],
    };
  }
}
