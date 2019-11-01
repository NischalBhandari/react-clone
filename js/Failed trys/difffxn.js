import render from './render.js';

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs, newAttrs) => {
  console.log("diffing attributes");
  const patches = [];

  // setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v);
      //this returns the same node not any new node.
      return $node;
    });
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node);
    }
    //not needed cause we are not assigning the patches to any value;
    return $node;
  };
};
const diffChildren = (oldVChildren, newVChildren) => {
  const childPatches = [];
  console.log(oldVChildren,"children test");
  oldVChildren.forEach((oldVChild, i) => {
  	console.log(oldVChild);
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });

  const additionalPatches = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push($node => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

  return $parent => {
    // since childPatches are expecting the $child, not $parent,
    // we cannot just loop through them and call patch($parent)
    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
      patch($child);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
};
const diff=(oldVTree,newVTree)=>{
	if(newVTree===undefined){
		return $node=>{
			$node.remove();
			return undefined;
		}
	}
	if(typeof oldVTree==='string'||typeof newVTree==='string'){
	console.log('string different');
    if(oldVTree!==newVTree){

			return $node=>{
				const $newNode=render(newVTree);
				$node.replaceWith($newNode);
				return $newNode;
			};
		}
		else{
			return $node=>$node;
		}
	}
	if(oldVTree.tagName!=newVTree.tagName){
    console.log('tagname different');
    console.log(newVTree);
		return $node=>{
			const $newNode=render(newVTree);
			$node.replaceWith($newNode);
			return $newNode;
		};
	}
	const patchAttrs=diffAttrs(oldVTree.attrs,newVTree.attrs);
	const patchChildren=diffChildren(oldVTree.children,newVTree.children);
	return $node=>{
		patchAttrs($node);
		patchChildren($node);
		return $node;
	};
};
export default diff;