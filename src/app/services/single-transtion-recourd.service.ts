import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SingleTranstionRecourdService {
  constructor() {}

  private singleTransitionObj: any;

  setSingleTransitionObj(data: any) {
    this.singleTransitionObj = data;
  }

  getSingleTransitionObj(): any {
    return this.singleTransitionObj;
  }
}
