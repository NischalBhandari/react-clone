import h from './hyperscript.js'
import Component from './component.js'
import { diff } from './v-dom.js';
import {parseElement} from './jsx.js';


class App extends Component{

	render(){
		return h('div',{},"hello",h('div',{class:"nice"},"nice"));
	}
}


var vnode=h(App);
parent=document.getElementById('app');
const primaryRender = (vnode, parent) => {
  var patch=diff(undefined, vnode, parent);
  console.log("app vnode",vnode)
  patch(parent);
}
primaryRender(vnode,parent);