import { Injectable } from '@nestjs/common';
import { SessionDto } from '../dtos/Session';
import { SessionFactory } from '../factories/session.factory';
import { Session } from '../model/Session';
import { SessionService } from './session.service';
const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');

@Injectable()
export class ReadJsonService extends EventEmitter {
  constructor(
    private sessionService: SessionService,
    private sessionFactory: SessionFactory,
  ) {
    super();
  }
  watchFolder(folder) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for folder changes on: ${folder}`,
      );
      const watcher = chokidar.watch(folder, { persistent: true });
      watcher.on('add', async (filePath) => {
        console.log(
          `[${new Date().toLocaleString()}] ${filePath} has been added.`,
        );
        // Read content of new file
        const fileContent = await fsExtra.readFile(filePath, 'utf8');
        const sessionDto: SessionDto = JSON.parse(fileContent);
        const session: Session = this.sessionFactory.toModel(sessionDto);
        console.log('session.sessionResult', session.sessionResult);
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
}
