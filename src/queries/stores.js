import {Store1} from "./Store1";
import {Store2} from "./Store2";
import {CharactersStore} from "./CharactersStore";
import {EpisodesStore} from "./EpisodesStore";
import {LocationsStore} from "./LocationsStore";

const stores = {
  $store1: new Store1(),
  $store2: new Store2(),
  $characters: new CharactersStore(),
  $episodes: new EpisodesStore(),
  $locations: new LocationsStore()
}
export {stores}