import mount from './mount.js'
import vElement	from './main.js';
const diffAttributes=(oldNodeAttr,newNodeAttr)=>{
	console.log(oldNodeAttr);
	console.log(newNodeAttr);
	var valueTest=[];
	var keyTest=[];
	const patches=[];
			for (const [k,v] of Object.entries(newNodeAttr)){
					patches.push(node=>{
						node.setAttribute(k,v);
						return node;
					});
				}

			for (const k in oldNodeAttr){
				if(!(k in newNodeAttr)){
					patches.push(node=>{
						node.removeAttribute(k);
						return node;
					});
				}
			}
					
			return (node)=>{
				for (const patch of patches){
					console.log(patch);
					patch(node);
				}
				return node;

			}
			}

const diff=(oldNode,newNode)=>{
/*
		if(oldNode.attributes.id!==newNode.attributes.id){
			return node=>{
				node.replaceWith(newNode.vElement);
				return newNode;

			}
		}*/
		if(oldNode.tag!==newNode.tag){
			return node=>{
				node.replaceWith(newNode.vElement);
				return newNode;
			}
		}
		console.log(oldNode.attributes,"Test1");
		console.log(newNode.attributes,"test2");
		var diffedPatch=diffAttributes(oldNode.attributes,newNode.attributes);
		/*var returnedAttr=diffedPatch(oldNode.vElement);*/

		
	return node=>{
		console.log(node,"this is my node");
		console.log(diffedPatch);
		diffedPatch(node);
		return newNode;
	};
	
};
export default diff;