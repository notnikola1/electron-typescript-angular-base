import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor() { }

  getIpcRenderer(){
    //@ts-ignore
    return (<any>window).ipc;
  }
}
