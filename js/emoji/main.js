import h from './emoji.js'
import Component from './component.js'
import { diff } from './v-dom.js';

const addItemToArray = (list) => {
  var listing=[]
  const addition=list[list.length-1]+1;
  return addition;
};

class App extends Component {
  render() {
    return h('div', { class: 'app' },
      h(Numbers),
      h(Numbers),
    )
  }
};

class Test{
  render(props,state){
   return h("hello",{class:"test"},"hi")
  }
}
class Numbers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [
       '1','2','3',"4"
      ],
      count:0,
    }


/*    this.timer = setInterval(_ => {
      this.setState({
        list: [...this.state.list, addItemToArray(this.state.list)],
        count:this.state.count+1,
      })
    }, 1000)*/
  }

      handleClick(){
        this.setState({
          count:this.state.count+1,
        })
      }  


  render(props, state) {

    return h(
      'div', {class:"my-class"},
      /*...state.list.map(item => h('li', {class:`${this.state.count}`}, `${this.state.count}`))*/
      h('button',{onclick:this.handleClick.bind(this)},"mybutton"),
      h('div',{class:"none"},`${this.state.count}`)
    )
  }
}

var vnode=h(App);
parent=document.getElementById('app');
const render = (vnode, parent) => {
  var patch=diff(undefined, vnode, parent);
  patch(parent);
}
render(vnode,parent);