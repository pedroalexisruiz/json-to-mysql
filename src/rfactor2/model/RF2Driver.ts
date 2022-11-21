import { RF2Car } from './RF2Car';

export class RF2Driver {
  //driver attrs
  Name: string;
  SteamID: string;
  cars?: RF2Car[];

  constructor(name: string, steamId: string, cars?: RF2Car[]) {
    this.Name = name;
    this.SteamID = steamId;
    this.cars = cars;
  }
}
