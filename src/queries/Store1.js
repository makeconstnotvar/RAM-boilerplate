import {computed, observable} from "mobx";
import {BaseStore} from "./BaseStore";

class Store1 extends BaseStore{
  @observable name = 'Петя';

  @computed do() {
    console.log('Петя do');
  }
}

export {Store1}