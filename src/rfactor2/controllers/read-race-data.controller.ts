import { Controller } from '@nestjs/common';
import { RaceReaderService } from '../services/race-reader.service';

@Controller()
export class RaceDataController {
  constructor(private readonly raceReaderService: RaceReaderService) {
    this.listen();
  }

  listen(): void {
    const folders = ['C:/Users/PEDRO.RUIZ/Documents/Leer xmls y json/rfactor2/prueba'];
    this.raceReaderService.on('file-added', (log) => {});
    this.raceReaderService.watchFolder(folders);
  }
}
