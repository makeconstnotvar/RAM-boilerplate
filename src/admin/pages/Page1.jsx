import React, {Component} from "react";
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class Page1 extends Component {
  doHandler = () => {
    const {$store1} = this.props;
    $store1.do();

  }

  render() {
    const {$store1} = this.props;
    return (
      <main>
        <h1>Страница 1</h1>
        <div>{$store1.name}</div>
        <div>
          <button onClick={this.doHandler}>нажми</button>
          <Select options={options} />
        </div>
      </main>
    )
  }
}

export {Page1}
