import {computed, observable} from "mobx";
import {BaseStore} from "./BaseStore";

class Store2 extends BaseStore {
  @observable name = 'Вася';

  @computed do() {
    console.log('Вася do');
  }
}

export {Store2}