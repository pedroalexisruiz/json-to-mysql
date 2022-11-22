import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RF2DriverDTO } from '../dto/RF2Driver';
import { RF2IncidentDTO } from '../dto/RF2IncidentDTO';
import { RF2SessionConfigDTO } from '../dto/RF2SessionConfig';
import { RF2Stream } from '../dto/RF2Stream';
import { RF2IncidentEntity, RF2SessionEntity } from '../entities';
import {
  RF2CarFactory,
  RF2IncidentFactory,
  RF2SessionFactory,
} from '../factories';
import { castIntFloat, findFastestLap, sortResults } from '../util';
import { RF2CarService } from './rf2car.service';
import { RF2IncidentService } from './rf2incident.service';
import { RF2SessionService } from './rf2session.service';
const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');
const xml2js = require('xml2js');

@Injectable()
export class RaceReaderService extends EventEmitter {
  parser = new xml2js.Parser({
    explicitArray: false,
    mergeAttrs: true,
    valueProcessors: [castIntFloat],
    attrValueProcessors: [castIntFloat],
  });
  constructor(
    private sessionService: RF2SessionService,
    private incidentService: RF2IncidentService,
    private carService: RF2CarService,
    private rF2SessionFactory: RF2SessionFactory,
    private incidentFactory: RF2IncidentFactory,
    private carFactory: RF2CarFactory,
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
          this.parser.parseString(fileContent, (err, result) => {
            const { rFactorXML } = result;
            const sessionConfig: RF2SessionConfigDTO = rFactorXML.RaceResults;
            this.processSession(sessionConfig, fileName);
            this.executeQueries();
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  executeQueries() {
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

  async processSession(sessionConfig: RF2SessionConfigDTO, fileName: string) {
    let session: RF2SessionEntity = await this.sessionService.findOne(fileName);

    if (!session) {
      const { Practice1, Qualify, Race } = sessionConfig;
      const sessionData = Practice1 || Qualify || Race;
      try {
        const stream: RF2Stream = sessionData.Stream;
        const drivers: RF2DriverDTO[] = sessionData.Driver;
        const fastestLap: number = findFastestLap(drivers);
        const sortedResults: RF2DriverDTO[] = sortResults(drivers);
        session = this.rF2SessionFactory.parseDTOtoModel(
          sessionConfig,
          fileName,
        );
        session.fastestLap = fastestLap;
        const sessionSaved: RF2SessionEntity = await this.sessionService.save(
          session,
        );
        this.processCars(sessionSaved, sortedResults);
        await this.processPenalties(sessionSaved.sessionId, stream.Penalty);
      } catch (error) {
        console.log('error', error);
        console.log(`El archivo ${fileName} tiene un formato incorrecto`);
      }
    }
  }

  async processCars(session: RF2SessionEntity, drivers: RF2DriverDTO[]) {
    const cars = this.carFactory.bulkDTOToModel(drivers, session, drivers[0]);
    await this.carService.saveAll(cars);
  }

  async processPenalties(sessionId: number, penalties: RF2IncidentDTO[]) {
    const penaltyEntities: RF2IncidentEntity[] = penalties
      ? this.incidentFactory.bulkDTOToModel(penalties, sessionId)
      : [];
    if (penaltyEntities.length) {
      await this.incidentService.saveAll(penaltyEntities);
    }
  }
}
