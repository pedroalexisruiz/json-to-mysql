import { Inject, Injectable } from '@nestjs/common';
import { AC1SessionDTO } from 'src/ac1/dtos';
import {
  AC1CarFactory,
  AC1EventFactory,
  AC1LapFactory,
  AC1ResultFactory,
  AC1SessionFactory,
} from 'src/ac1/factories';
import {
  AC1Car,
  AC1Driver,
  AC1Event,
  AC1Lap,
  AC1Result,
  AC1Session,
} from 'src/ac1/model';
import { DataSource } from 'typeorm';
import { AC1CarService } from './ac1car.service';
import { AC1DriverService } from './ac1driver.service';
import { AC1EventService } from './ac1event.service';
import { AC1LapService } from './ac1lap.service';
import { AC1ResultService } from './ac1result.service';
import { AC1SessionService } from './ac1session.service';
const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');

@Injectable()
export class AC1SessionReaderService extends EventEmitter {
  constructor(
    private sessionService: AC1SessionService,
    private carFactory: AC1CarFactory,
    private carService: AC1CarService,
    private driverService: AC1DriverService,
    private sessionFactory: AC1SessionFactory,
    private lapFactory: AC1LapFactory,
    private lapService: AC1LapService,
    private eventFactory: AC1EventFactory,
    private eventService: AC1EventService,
    private sessionResultFactory: AC1ResultFactory,
    private sessionResultService: AC1ResultService,
    @Inject('DATA_SOURCE') private datasource: DataSource,
  ) {
    super();
  }
  watchFolder(folder) {
    try {
      const watcher = chokidar.watch(folder, {
        persistent: true,
        ignored: /time-attack/,
      });
      watcher.on('add', async (filePath) => {
        console.log(
          `[${new Date().toLocaleString()}] ${filePath} has been added.`,
        );
        const routeFolders = filePath.split('\\');
        const fileName: string = routeFolders[routeFolders.length - 1];
        // Read content of new file
        const fileContent = await fsExtra.readFile(filePath, 'utf-8');
        if (fileContent) {
          this.generateReport(fileName, fileContent);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async generateReport(fileName: string, fileContent: string) {
    let session: AC1Session = await this.sessionService.findOne(fileName);

    if (!session) {
      try {
        const sessionDto: AC1SessionDTO = JSON.parse(fileContent);
        await this.saveAC1SessionReport(sessionDto);
      } catch (error) {
        console.log('error', error);
        console.log(`El archivo ${fileName} tiene un formato incorrecto`);
      }
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
  }
  async saveAC1SessionReport(sessionDto: AC1SessionDTO): Promise<void> {
    let sessionSaved: AC1Session;

    const session = this.sessionFactory.toModel(sessionDto);
    sessionSaved = await this.sessionService.save(session);
    const { cars, drivers } = this.extractCarsAndDrivers(
      sessionDto,
      sessionSaved.sessionId,
    );
    await this.driverService.bulkSave(drivers);
    console.log(`Guardé pilotos de ${session.Type},${session.SessionFile}`);
    await this.carService.bulkSave(cars);
    console.log(`Guardé vehiculos de ${session.Type},${session.SessionFile}`);
    const sessionResults: AC1Result[] = sessionDto.Result.map((result) =>
      this.sessionResultFactory.toModel(result, sessionSaved),
    );
    await this.sessionResultService.saveAll(sessionResults);
    console.log(`Guardé resultados de ${session.Type},${session.SessionFile}`);
    const laps: AC1Lap[] = sessionDto.Laps.map((lap, index) =>
      this.lapFactory.toModel(lap, sessionSaved, index + 1),
    );
    await this.lapService.saveAll(laps);
    console.log(`Guardé vueltas de ${session.Type},${session.SessionFile}`);

    const events: AC1Event[] = sessionDto.Events.map((event) =>
      this.eventFactory.toModel(event, sessionSaved),
    );
    await this.eventService.saveAll(events);
    console.log(`Guardé eventos de ${session.Type},${session.SessionFile}`);
  }
  extractCarsAndDrivers(
    session: AC1SessionDTO,
    sessionId: number,
  ): {
    cars: AC1Car[];
    drivers: AC1Driver[];
  } {
    const carsMap = new Map<number, AC1Car>();
    const driversMap = new Map<string, AC1Driver>();
    session.Cars.forEach((car) => {
      carsMap.set(car.CarId, this.carFactory.toModel(car, sessionId));
      driversMap.set(car.Driver.Guid, car.Driver);
    });

    return {
      cars: [...carsMap.values()],
      drivers: [...driversMap.values()],
    };
  }
}
