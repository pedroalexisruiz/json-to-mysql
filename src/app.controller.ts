import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import * as chokidar from 'chokidar';
const fs = require('fs');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.listenToJsons();
  }

  listenToJsons(): void {
    console.log('listening');
    const watcher = chokidar.watch('./jsons', {
      ignored: /^\./,
      persistent: true,
    });

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
