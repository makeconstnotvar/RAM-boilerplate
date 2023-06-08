import React, {Component} from "react";

class Page2 extends Component {
  doHandler = () => {
    const {$store2} = this.props;
    $store2.do();
  }
  render() {
    const {$store2} = this.props;
    return (
      <main>
        <h1>Страница 2</h1>
        <div>{$store2.name}</div>
        <div>
          <button onClick={this.doHandler}>нажми</button>
        </div>
      </main>
    )
  }
}

export {Page2}
