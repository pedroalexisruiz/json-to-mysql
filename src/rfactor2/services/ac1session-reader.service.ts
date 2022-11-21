import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { castIntFloat } from '../util';
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
  constructor() {
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
          this.parser.parseString(fileContent, function (err, result) {
            const {
              rFactorXML: { RaceResults },
            } = result;
            const { Practice1, Qualify, Race } = RaceResults;
            const sessionData = Practice1 || Qualify || Race;
            const data = sessionData;
            const stream = data.Stream;
            const drivers = data.Driver;
            const driver = drivers ? drivers[0] : {};
            const streamRow = stream ? stream : {};
            const { Score, Penalty, Sector, Incident } = streamRow;
            //console.log('RaceResults', RaceResults);
            // console.log('Score', Score);
            // console.log('Penalty', Penalty);
            // console.log('Sector', Sector);
            // console.log('Incident', Incident);
            console.log('Done');
          });
          //this.generateReport(fileName, fileContent);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
