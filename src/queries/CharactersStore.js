import {computed, observable} from "mobx";
import {BaseStore} from "./BaseStore";
import {rickApi} from "../api/rickApi";

class CharactersStore extends BaseStore {
  @observable fetchMethod = rickApi.searchEpisodes;


}

export {CharactersStore}