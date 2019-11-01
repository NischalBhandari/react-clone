function createElement(type,config,children){
	let props=Object.assign({},config);
	let childCount = arguments.length-2;
	if(childCount===1){
		props.children=children;
	}else if(childCount>1){
		props.children=[].slice.call(arguments,2);
	}
	return {
		type,
		props,
	};
}



function mountComponent(component){
	let markup=component.mountComponent();
	return markup;

}
function receiveComponent(component,element){
	let prevElement=component._currentElement;
	if(prevElement===element){
		return ;
	}
	component.receiveComponent(element);
}
function unmountComponent(component){
	component.unmouontComponent();
}
function performUpdateIfNecessary(component){
	component.performUpdateIfNecessary();
}