import h from './emoji.js'
import Component from './component.js'
import { diff } from './v-dom.js';

const addItemToArray = (list) => {
  console.log(list,"this is the list");
  var listing=[]
  const addition=list[list.length-1]+1;
  console.log(Math.round(Math.random()*list.length-1),"this is the listing");
  return addition;
};

class App extends Component {
  render() {
    return h('div', { class: 'app' },
      h('h1', null, h(Numbers)),
      h(Numbers)
    )
  }
};

class Numbers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [
       '1','2','3',"4"
      ],
      count:0,
    }

    this.timer = setInterval(_ => {
      this.setState({
        list: [...this.state.list, addItemToArray(this.state.list)],
        count:this.state.count+1,
      })
    }, 1000)
  }

  render(props, state) {
    return h(
      'ul', {class:"my-class"},
      ...state.list.map(item => h('li', {class:`${this.state.count}`}, item))
    )
  }
}

const render = (vnode, parent) => {
  diff(undefined, vnode, parent)
}
render(h(App), document.getElementById('app'))