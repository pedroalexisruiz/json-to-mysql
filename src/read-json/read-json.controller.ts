import { Controller } from '@nestjs/common';
import * as chokidar from 'chokidar';
import { ReadJsonService } from 'src/read-json/services/read-json.service';
const fs = require('fs');

@Controller()
export class ReadJsonController {
  constructor(private readonly readJsonService: ReadJsonService) {
    this.listen();
  }

  listen(): void {
    const folder = 'Jsons';
    this.readJsonService.on('file-added', (log) => {
      // print error message to console
      //console.log(log.message);
    });
    this.readJsonService.watchFolder(folder);
  }

  listenToJsons(): void {
    console.log('listening');
    const watcher = chokidar.watch(
      'C:sessions/PEDRO.RUIZ/Documents/jsons-asseto-corsa',
      {
        persistent: true,
      },
    );

    watcher
      .on('add', function (path) {
        console.log('File', path, 'has been added');
        let obj;
        fs.readFile(path, 'utf8', function (err, data) {
          if (err) throw err;
          obj = JSON.parse(data);
          console.log('obj', obj);
        });
      })
      .on('error', function (error) {
        console.error('Error happened', error);
      });
  }
}
