import { Controller } from '@nestjs/common';
import { ReadJsonService } from 'src/read-json/services/acc';

@Controller()
export class ACCReadJsonController {
  constructor(private readonly readJsonService: ReadJsonService) {
    this.listen();
  }

  listen(): void {
    const folders = ['C:/Users/PEDRO.RUIZ/Documents/results'];
    this.readJsonService.on('file-added', (log) => {});
    this.readJsonService.watchFolder(folders);
  }
}
