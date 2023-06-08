import {computed, observable} from "mobx";
import {BaseStore} from "./BaseStore";

class LocationsStore extends BaseStore{
  @observable name = 'Петя';

  @computed do() {
    console.log('Петя do');
  }
}

export {LocationsStore}