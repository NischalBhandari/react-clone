const lowercase=input=>{

}
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
  return($node=>{
    for(const patch of patches){
      
      patch($node);
      
    }
    return $node;
  })

}
const diffChildren=(vnodeChildren,domNodeChildren,dom)=>{
  const patches=[];


  if(vnodeChildren.length!=domNodeChildren.length){
    patches.push($node=>{
      $node.appendChild(renderNode(vnodeChildren[domNodeChildren.length]))
      return $node;
    })
  }


  return $node=>{
  for (var patch of patches){
    patch($node);
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
        if(typeof attributes[key]=='function' && key.startsWith('on')){
          console.log(attributes[key],"my attrs");
          el.__gooactHandlers = el.__gooactHandlers || {};
          console.log(el.__gooactHandlers['click'],"this is go act handlers");
          el.removeEventListener('click',el.__gooactHandlers['click']);
          el.__gooactHandlers ['click']=attributes[key];
          console.log(el.__gooactHandlers );
          el.addEventListener('click',el.__gooactHandlers ['click']);
        }
        else{
      el.setAttribute(key, attributes[key])
        }
    }
  } else if (typeof nodeName === 'function') { // here is our `People`
    // initiate our component
    const component = new nodeName(attributes);
    el = renderNode(
      component.render(component.props, component.state)
    )
    // save DOM reference to `base` field as in `renderComponent`
    component.base = el
  }
  // recursively do this to all of its children
  (children || []).forEach(child => el.appendChild(renderNode(child)))

  return el
}

export const renderComponent = (component, parent) => {
  console.log(component,"component");
  let rendered = component.render(component.props, component.state)
  console.log(component.props,component.state);
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
      const rendered = component.render(component.props, component.state);
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
    var patchChild=diffChildren(vnode.children,dom.childNodes,dom);
    patchChild(dom);
    // run diffing for children
    dom.childNodes.forEach((child, i) => diff(child, vnode.children[i]))

    return dom;
    /*return dom;*/
  } else {
    return $node=>{
      $node.replaceWith(renderNode(vnode));
      return $node;
    }
/*    const newDom = renderNode(vnode)
    parent.appendChild(newDom)
    return newDom*/
  }
}