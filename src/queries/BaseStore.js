import {action, computed, observable} from "mobx";
import {isPermitted} from "./codes";

class BaseStore {

  fetchItemsAdapter = response => (response);

  fetchMethod = function (params, executor) {
    throw 'Не задан fetchMethod';
  };

  fetchItemMethod = function (params, executor) {
    throw 'Не задан fetchMethod';
  };

  saveMethod = function (params) {
    throw 'Не задан saveMethod';
  };

  fetchFailed = (e) => {

  };

  fetchSuccess = (response) => {
  };

  fetchItemSuccess = (response) => {
    this.item = response;
  };

  saveSuccess = response => {

  };
  syncItems = (store) => {
  };

  executor = {cancel: null};

  @observable fetchProgress = false;
  @observable fetchError = false;
  @observable fetchErrorText = "";
  @observable fetchDone = false;

  @observable saveProgress = false;
  @observable saveError = false;
  @observable saveErrorText = "";
  @observable saveDone = false;

  @observable items = [];
  @observable item = {};
  @observable total = 0;
  @observable noResults = false;

  @computed get noItem() {
    return Object.entries(this.item).length === 0;
  }

  @computed get noItems() {
    return this.items.length === 0;
  }

  @action fullReset() {
    this.fetchProgress = false;
    this.fetchError = false;
    this.fetchErrorText = "";
    this.saveErrorText = "";
    this.fetchDone = false;
    this.items = [];
    this.item = {};
    this.total = 0;
    this.noResults = false;
  }

  @action fetchItems(params) {
  if (this.executor.cancel)
  this.executor.cancel('user cancel');
  this.fetchProgress = true;
  this.fetchError = false;
  this.fetchErrorText = "";
  this.fetchDone = false;
  let fetchCancel = false;
  return this.fetchMethod(params, this.executor)
.then(action(response => {
  this.fetchDone = true;
  response = this.fetchItemsAdapter(response);
  this.items = response?.items || [];
  this.total = response?.total || 0;
  this.fetchSuccess(response);
}))
.catch(action(e => {
  if (e.message == "user cancel") {
    fetchCancel = true;
    return;
  }
  this.fetchError = true;
  if (isPermitted(e?.response?.data?.code))
    this.fetchErrorText = e.response.data.message;
  this.fetchFailed(e);
  if (e.uri) {
    navigate(e.uri);
  }
  //console.error(`Ошибка в методе "${this.fetchMethod.name}":`, e);
}))
  .finally(action(() => {
    if (!fetchCancel)
      this.fetchProgress = false;
  }));
}

@action fetchItem(params) {
  this.fetchProgress = true;
  this.fetchError = false;
  this.fetchErrorText = "";
  this.fetchDone = false;
  let fetchCancel = false;
  return this.fetchItemMethod(params)
    .then(action(response => {
      this.fetchDone = true;
      this.fetchItemSuccess(response);
    }))
    .catch(e => {
      if (e.message == "user cancel") {
        fetchCancel = true;
        return;
      }
      this.fetchError = true;
      if (isPermitted(e?.response?.data?.code))
        this.fetchErrorText = e.response.data.message;
      this.fetchFailed(e);
      if (e.uri) {
        navigate(e.uri);
      }
      //console.error(`Ошибка в методе "${this.fetchMethod.name}":`, e);
    })
    .finally(() => {
      if (!fetchCancel)
        this.fetchProgress = false;
    });
}

@action saveItem(params) {
  this.saveProgress = true;
  this.saveError = false;
  this.saveDone = false;
  this.saveErrorText = "";
  return new Promise((resolve, reject) => {
    this.saveMethod(params)
      .then(action(response => {
        this.saveDone = true;
        this.saveSuccess(response);
        resolve(response);
      }))
      .catch(e => {
        this.saveError = true;
        if (isPermitted(e?.response?.data?.code))
          this.saveErrorText = e.response.data.message;
        console.error(`Ошибка в методе "${this.saveMethod.name}":`, e);
        reject(e);
      })
      .finally(() => {
        this.saveProgress = false;
      });
  });
}
}

export {BaseStore};