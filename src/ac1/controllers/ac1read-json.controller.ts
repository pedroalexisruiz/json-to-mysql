import { Controller } from '@nestjs/common';
import { AC1SessionReaderService } from 'src/ac1/services';

@Controller()
export class AC1ReadJsonController {
  constructor(
    private readonly aC1SessionReaderService: AC1SessionReaderService,
  ) {
    this.listen();
  }

  listen(): void {
    const folders = ['C:/Users/PEDRO.RUIZ/Documents/Leer xmls y json/acc1'];
    this.aC1SessionReaderService.on('file-added', (log) => {});
    this.aC1SessionReaderService.watchFolder(folders);
  }
}
