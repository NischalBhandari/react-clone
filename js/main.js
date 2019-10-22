export default class vElement{
	constructor(object){
		this.tag=object.tag;
		this.attributes=object.attributes;
		this.dom=object.dom;
		this.children=object.children;
		this.array=[];
	}
	
	mountVElement(){
		this.vElement=document.createElement(this.tag);
		for(const [k,v] of Object.entries(this.attributes)){
			this.vElement.setAttribute(k,v);
		}
		for(const child of this.children){
			if(typeof child === 'object' ){
			const $child=new vElement(child);
			this.vElement.appendChild($child.mountVElement().vElement);
			this.array.push($child);
			}
			else {
				this.vElement.innerHTML=child ;
				this.array.push(child);
			}
		}
		if(this.dom!==null){
			/*this.dom.appendChild(this.vElement);*/
		}
		return this;
	}
	unMountVElement(){
		this.parentDOMNode.removeChild(this.vElement);
	}


}

/*const root = document.body;
//create vmn element
const myApp = new vElement('ul', { className: 'my-class',id:'main-class' },root);
myApp.mountVElement();
var buttonTest = document.getElementById("remove");
buttonTest.addEventListener("click",removeVElement,false);
function removeVElement(){
	myApp.unMountVElement();
}*/