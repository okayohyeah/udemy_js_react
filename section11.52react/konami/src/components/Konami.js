import React, { Component } from 'react';
import Mousetrap from 'mousetrap';


class Konami extends Component {
  constructor(props) {
    super(props);
    this.popUp = this.popUp.bind(this);
  }


  componentDidMount() {
    Mousetrap.bind([`1 2 3 4`, `up up down down left right left right b a`], this.popUp)
  }

  componentWillUnmount () {
    Mousetrap.unbind([`1 2 3 4`, `up up down down left right left right b a`])
  }

  popUp() {
    alert(`The Konami code happened ${this.props.name}`);
  }

  render() {
    return (
      <div>Konami code activated {this.props.name}</div>
    );
  }
}

export default Konami;