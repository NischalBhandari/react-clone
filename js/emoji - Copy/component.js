import { renderComponent } from './v-dom.js';

export default class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }

  setState(state) {
  	console.log(state,"this is the state in class component",this.state);
    this.state = Object.assign({}, state)
    renderComponent(this)
  }
}