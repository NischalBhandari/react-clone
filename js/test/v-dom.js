
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
  const { nodeName, attributes, children } = vnode
    console.log(vnode);
  if (vnode.split) return document.createTextNode(vnode)

  if (typeof nodeName === 'string') {
    el = document.createElement(nodeName)

    for (let key in attributes) {
        if(key=='onclick'){
          el.eventHandler = el.eventHandler || {};
          el.removeEventListener('click',el.eventHandler['click']);
          el.eventHandler ['click']=attributes[key];
          el.addEventListener('click',el.eventHandler ['click']);
        }
        else{
      el.setAttribute(key, attributes[key])
        }
    }
  } else if (typeof nodeName === 'function') {
    const component = new nodeName(attributes);
    el = renderNode(
      component.render()
    )
    component.base = el
  }
  (children||[]).forEach(child => el.appendChild(renderNode(child)))

  return el
}

export const renderComponent = (component, parent) => {
  console.log(component,"component");
  let rendered = component.render();
  component.base = diff(component.base, rendered)
}

export const diff = (dom, vnode, parent) => {
  var patches=[];
  if (dom) {
    if(vnode==undefined){
      return undefined;
       
    }


    if (typeof vnode === 'string'||typeof dom==='string') {
      if(vnode!==dom){
        console.log("vnode is not equal to dom");
        dom.nodeValue = vnode;
      return dom
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
    console.log(dom,"for lower case");
    var lowerTagName=dom.tagName.toLowerCase();
    if(vnode.nodeName!==lowerTagName){
      const component = renderNode(vnode);
      dom.replaceWith(component);
      return component;
    }

    var patch=diffAttributes(vnode.attributes,dom.attributes);
    patch(dom);
/*    var patchChild=diffChildren(vnode.children,dom.childNodes,dom);
    patchChild(dom);*/
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