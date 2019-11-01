import h from './hyperscript.js'
import Component from './component.js'
import { diff } from './v-dom.js';
import {parseElement} from './jsx.js';


class App extends Component{
	jumpTo(){
		console.log("jumped");
	}
	render(){
		var x=parseElement('<div onClick=this.jumpTo.bind(this)>Hello</div>');
		console.log(x,"this is the element");
		return h(x.nodeName,x.attributes,x.children);
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