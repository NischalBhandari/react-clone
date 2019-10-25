class Component{
	constructor(props){
	this.props=props;
	this._currentElement=null;
	this._pendingState=null;
	this._renderedComponent=null;
	this._renderedNode=null;
	assert(typeof this.render==='function');
}
setState(partialState){
	this._pendingState=object.assign({},instance.state,partialState);
	Reconciler.performUpdateIfNecessary(this);
}
_construct(element){
	this._currentElement=element;
}
mountComponent(){
	let renderedElement=this.render();

let component= instantitateComponent(renderedElement);
this._renderedComponent=component;
let renderedNode=Reconciler.mountComponent(component,node);
return renderedNode;
}
receiveComponent(nextElement){
	this.updateComponent(nextElement);
}
updateComponent(nextElement){
	let prevElement=this._currentElement;
	if(prevElement!==nextElement){
		
	}
}
}