export const renderComponent = (component,parent)=>{
	const oldBase=component.base 
	component.base=renderNode(
		component.render(component.props,component.state)
		)
	if(parent){
		parent.appendChild(component.base)
	}
	else{
		oldBase.parentNode.replaceChild(component.base,oldBase)
	}
};