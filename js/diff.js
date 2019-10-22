import mount from './mount.js'
import vElement	from './main.js';
const diff=(oldNode,newNode)=>{
		if(oldNode.attributes.id!==newNode.attributes.id){
			mount(newNode.vElement,oldNode.vElement);
			return newNode;
		}
		else if(oldNode.tag!==newNode.tag){
			mount(newNode.vElement,oldNode.vElement);
			return newNode;
		}
		for(var i=0;i<newNode.array.length;i++){
			if(newNode.array[i].vElement){
		if(! oldNode.array[i].vElement.isEqualNode(newNode.array[i].vElement)){
			console.log("children not equal",i);
			console.log(oldNode.array[i].vElement,newNode.array[i].vElement);
			
			console.log(oldNode.array[i],newNode.array[i]);
			diff(oldNode.array[i],newNode.array[i]);
			mount(newNode.array[i].vElement,oldNode.array[i].vElement);
			}
		}
	}
		
	return newNode;
	
};
export default diff;