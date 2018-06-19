import { observable, computed, action } from 'mobx'

export default class AppState {
  @observable count = 0

  @observable name = 'Jokcy'

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }
}

