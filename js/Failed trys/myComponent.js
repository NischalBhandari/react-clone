const createVApp=count=>createElement('div',{
	attrs:{
		id:'app',
		dataCount:count,
	},
	children:[
	'The current count is :',
	String(count),
	createElement('img',{
		attrs:{

			src:'./images/test.jpg',
		},
	}),
	createElement('button',{
		attrs:{
			id:'test',
		},
		children:["Test"]
	}),
	],
});


function createElement(type,config={},children=[]){

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

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};
function mount($node,$target){
	$target.replaceWith($node);
	return $node;
		}
function diffChildren (oldVChildren=[], newVChildren=[]){
  const childPatches = [];
  console.log(newVChildren,"newVChildren");
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diffing(oldVChild, newVChildren[i]));
  });

  const additionalPatches = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push($node => {
    	$childrenClass=new component(additionalVChild);
      $node.appendChild($childrenClass.mountElement());
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

const diffAttrs = (oldAttrs={}, newAttrs={}) => {
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

function diffing(oldTree,newTree){
	console.log("diffed");
		if(newTree===undefined){
			console.log("this is undefined");
		return $node=>{
			$node.remove();
			return undefined;
		}
	}
	if(typeof oldTree==='string'||typeof newTree==='string'){
		console.log("this is string",oldTree,newTree);
		if(oldTree!==newTree){

			return $node=>{
				console.log(newTree);
				const $newNodeClass=new component(newTree);
				console.log($newNodeClass);
				$newNode=$newNodeClass.mountElement();
				console.log($newNode);

				console.log($newNode);
				$node.replaceWith($newNode);
				return $newNode;
			};
		}
		else{
			return $node=>$node;
		}
	}
	if(oldTree.tagName!=newTree.tagName){
		return $node=>{
			const $newNodeClass=new component(newTree);
			$newNode=$newNodeClass.mountElement();
			$node.replaceWith($newNode);
			return $newNode;
		};
	}
	console.log(oldTree,newTree,"check values");
	var patchAttrs=diffAttrs(oldTree.props.attrs,newTree.props.attrs);
	var patchChildren=diffChildren(oldTree.props.children,newTree.props.children);
	return $node=>{
		patchAttrs($node);
		patchChildren($node);
		return $node;
	};
}


class component{
	constructor(configuration){
		this.configuration=configuration;
		this.type=configuration.type;
		this.props=configuration.props;

		this.state=null;
		this.array=[];
	}

	render(){

	}
	mountElement(){
		console.log("this is the configuration",typeof this.configuration);
		if(typeof this.configuration==="string"){
			console.log("test insdie");
			
			this.renderedElement=document.createTextNode(this.configuration);
			console.log(this.renderedElement);
			this.array.push(this.configuration);
			return this.renderedElement;
		}
		else{
		this.renderedElement=document.createElement(this.type);
		for(const [k,v] of Object.entries(this.props.attrs)){
			this.renderedElement.setAttribute(k,v);
		}
		if(this.props.children){
		for(const child of this.props.children){
			if(typeof child==='string'){
				var childNode=document.createTextNode(child);
				this.renderedElement.appendChild(childNode);
				this.array.push(child);
				
			}
			else{
				const $child=new component(child);
				this.renderedElement.appendChild($child.mountElement());
				this.array.push($child);
			}
		}
	}
		return this.renderedElement;
	}


	

}
}
let count=0;
let vApp=createVApp(count);
var application=new component(vApp);
var $app=application.mountElement();
var $rootEl=mount($app,document.getElementById('app'));
setInterval(function(){
	count++;
	console.log(document.body);
	let newVApp=createVApp(count);
	var newApplication=new component(newVApp);
	var $newApp=newApplication.mountElement();
	const patch=diffing(vApp,newVApp);
	$rootEl=patch($rootEl);
	vApp=newVApp;
},1000);