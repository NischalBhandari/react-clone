import h from './hyperscript.js'
import Component from './component.js'
import { diff } from './v-dom.js';

class App extends Component {
  render() {
    return h('div', { class: 'app' },
      h(Numbers),
      h(Numbers),
      h(Test)
    )
  }
};

class Test{
  render(){
   return h("hello",{class:"test"},"hi")
  }
}
class Numbers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count:0,
      counter:2,
    }
    this.timer=setInterval(tes=>{
      this.setState({
        counter:this.state.counter+1,
        count:this.state.count
      });
    },1000)
  }

  handleClick(){
        this.setState({
          counter:this.state.counter,
          count:this.state.count+1,
        },{count:this.state.count+1})
      }  


  render() {
    var xyz='my button';
    return h(
      'div', {class:"my-class"},
      h('button',{onclick:this.handleClick.bind(this)},xyz),
      h(Test),
      h('div',{class:`testing ${this.state.count}`},`${this.state.count}`),
      h('div',{class:"none"},`${this.state.counter}`)
    )
  }
}

var vnode=h(App);
parent=document.getElementById('app');
const primaryRender = (vnode, parent) => {
  var patch=diff(undefined, vnode, parent);
  patch(parent);
}
primaryRender(vnode,parent);