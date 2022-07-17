import { Controller } from '@nestjs/common';
import { ReadJsonService } from 'src/read-json/services/read-json.service';

@Controller()
export class ReadJsonController {
  constructor(private readonly readJsonService: ReadJsonService) {
    this.listen();
  }

  listen(): void {
    const folders = [
      'C:/Users/PEDRO.RUIZ/Documents/Jsons',
      'D:/Proyectos/liga f1/json-to-mysql/Jsons',
    ];
    this.readJsonService.on('file-added', (log) => {});
    this.readJsonService.watchFolder(folders);
  }
}
