export default function renderNode(vnode){
	let el;
	const {nodeName,attributes,children}=vnode;
	if(vnode.split) return document.createTextNode(vnode);
	if(typeof nodeName==='string'){
	el=document.createElement(nodeName);
	for (let key in attributes){
		el.setAttribute(key,attributes[key]);
	}
}else if(typeof nodeName==='function'){
	const component=new nodeName(attributes);
	el=renderNode(component.render(component.props,component.state))
	component.base=el;
}
	(children||[]).forEach(child=>el.appendChild(renderNode(child)));
	return el;
}