
const diffAttributes=(vnodeAttrs,domnodeAttrs)=>{
  const patches=[];
  for (const [k,v] of Object.entries(vnodeAttrs)){
    patches.push($node=>{
      $node.setAttribute(k,v)
    })
  }
  for (const[k,v] of Object.entries(domnodeAttrs)){
    patches.push($node=>{
      $node.removeAttribute(k);
    });
  }
  return(realNode=>{
    for(const patch of patches){
      
      patch(realNode);
      
    }
    return realNode;
  })

}
const diffChildren=(vnodeChildren,domNodeChildren,dom)=>{
  const patches=[];

  if(vnodeChildren.length!=domNodeChildren.length){
    patches.push(realNode=>{
      realNode.appendChild(renderNode(vnodeChildren[domNodeChildren.length]))
      return realNode;
    })
  }


  return realNode=>{
  for (var patch of patches){
    patch(realNode);
  }
  }
    
}
const renderNode = vnode => {
  let el;
  if (Array.isArray(vnode)){
    vnode=vnode[0];
  }
  else{
  }
  const { nodeName, attributes, children } = vnode
  if (vnode.split|| typeof vnode==="number"){ 

    return document.createTextNode(vnode);
  }

  if (typeof nodeName === 'string') {
    el = document.createElement(nodeName)
    //listen to dom attributes 
    for (let key in attributes) {
        if(key=='onClick'||key=='onChange'||key=='onInput'){
          let eventValue=key.slice(2);
            //event value is added to parse the onClick/onChange to lower case and removing "on".
            //event value is a type of event
        el.eventHandler=el.eventHandler || {};
       el.eventValue = eventValue.toLowerCase();
       el.removeEventListener(el.eventValue,el.eventHandler [el.eventValue]);
       el.eventHandler[el.eventValue]=attributes[key];
       el.addEventListener(el.eventValue,el.eventHandler[el.eventValue]);
      }
        else{
      el.setAttribute(key, attributes[key])
        }
    }
  } else if (typeof nodeName === 'function') {
    const component = new nodeName(attributes);
    //calling component did mount here cause it will be the first time component is rendered.
    component.componentWillMount();
    el = renderNode(
      component.render()
    )
    component.componentDidMount();
    component.base = el
  }

  (children||[]).forEach(child =>{ 
    el.appendChild(renderNode(child));});

  return el
}

export const renderComponent = (component, parent) => {
  let rendered = component.render();
  component.base = diff(component.base, rendered)
}

export const diff = (dom, vnode, parent) => {
  var patches=[];
  if (dom) {
    if(vnode==undefined){
      return undefined;
       
    }


    if (typeof vnode === 'string'||typeof dom.nodeValue==='string') {
      if(vnode===dom.nodeValue){
      return dom;
    }
    else{
        dom.nodeValue = vnode;
      return dom;
    }

    } 
    //if the passed node is a class then 
    if (typeof vnode.nodeName === 'function') {
      const component = new vnode.nodeName(vnode.attributes)
      const rendered = component.render();
      var xyz=diff(dom, rendered);
      return dom;
/*      return $node=>{
        $node.appendChild(renderNode(rendered));
        return $node;
      }*/
    }


    //to check if tagname are the same or different if they are different then change whole node and children
    var lowerTagName=dom.tagName.toLowerCase();
    if(vnode.nodeName!==lowerTagName){
      const component = renderNode(vnode);
      dom.replaceWith(component);
      return component;
    }

    var patch=diffAttributes(vnode.attributes,dom.attributes);
    patch(dom);
    var patchChild=diffChildren(vnode.children,dom.childNodes,dom);
    patchChild(dom);
    // run diffing for children
    dom.childNodes.forEach((child, i) => diff(child, vnode.children[i]))

    return dom;
  } else {
    return realNode=>{
      realNode.replaceWith(renderNode(vnode));
      return realNode;
    }
  }
}