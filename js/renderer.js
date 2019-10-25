const ROOT_KEY='dlthmRootId';
const instancesByRootId={};
let rootID=1;

function isRoot(node){
	if(node.dataset[ROOT_KEY]){
		return true;
	}
	return false;
}
function render(element,node){
	assert(Element.isValidElement(element));
	if(isRoot(node)){
		update(element,node);
	}
	else{
		mount(element,node);
	}
}
function mount(element,node){
	let component=instantiateComponent(element);
	instancesByRootId[rootID]=component;
	let renderedNode=Reconciler.mountComponent(component,node);
	node.dataset[ROOT_KEY]=rootID;
	DOM.empty(node);
	DOM.appendChild(node,renderedNode);
	rootID++;
}
function update(element,node){
	let id=node.dataset[ROOT_KEY];
	let instance=instancesByRootId[id];
	let prevElem=instance._currentElement;
	if(shouldUpdateComponent(prevElem,element)){
		Reconciler.receiveComponent(
			instance,
			element
			);
	}
	else{
		unmountComponentAtNode(node);
		mount(element,node);
	}
}
function shouldUpdateComponent()
	prevElem,
	nextELem
){
	return prevElement.type===nextELement.type;
}
