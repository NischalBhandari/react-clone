
const types={
		element:'element',
		value:'value',
		props:'props',
	}
const parseElement=(str)=>{
		let match;
		let length;
		let closed=false;
		let closing;
	const node={
		type:null,
		attributes:{},
		children:[],
		length:0,
		tagName:'',
	}
	match = str.match(/<(\w+)/);
	if(!match){
		str=str.split('<')[0];
		return parseValue(str)
	}
	node.tagName=match[1];
	closing="</"+node.tagName+">";
	console.log("closing",closing);

	
	length=match.index+match[0].length;
	str=str.slice(length);
	
	match=str.match(/>/);
	node.attributes=parseProps(str.slice(0,match.index));
	str=str.slice(match.index+1);
	var matched=str.match(closing);
	console.log(matched);
	str=str.slice(0,matched.index);
	var numberOfChildren=str.match(/</g);
	if(numberOfChildren){
	node.children=(parseChildren(str));
	return node;		
	}
	else{
		console.log(str,"Didnt have number of children");
		node.children.push(parseElement(str));
		return node;
	}

}
const parseProps=(str)=>{
	let match;
	let length;
	let key;
	let value;
	const node={

	}
	str='{'+str+'}';
	console.log(str,"this is the string");

	
	return str;
}
const parseChildren=(str)=>{
let match;
let patches=[];
let returner=[];
let elem;
let matcher;
let length;
let doesEnd;
match = str.match(/<(\w+)/);
if(match){

	while(str.length){
	match=null;
	match = str.match(/<(\w+)/);
console.log(match,"children match");
console.log(str,"this is the element string")
elem=match[1];
console.log(elem,"this is the element");
matcher="</"+elem+">";
doesEnd=str.match(matcher);
console.log(doesEnd,"it ends here");
patches.push(str.slice(0,doesEnd.index+matcher.length));
str=str.slice(doesEnd.index+matcher.length);
}
console.log(str.length,"after doesend");
console.log(patches,"this is the patches");
patches.forEach((patch)=>{
	returner.push(parseElement(patch));
});
return returner;
}
else{
return parseValue(str);
}

}
/*	node.props=parseProps(str.slice(0,match.index),values);
	length=node.props.length;
	str=str.slice(length);
	node.length+=length;
	match=str.match(/^ *\/ *>/);
	if(match){
		node.length+=match.index+match[0].length
		return node;
	}
	match=str.match(/>/);
	if(!match) return node;
	length=match.index+1;
	str=str.slice(length);
	node.length+=length;
	let child=parseElement(str);
	while(child.type===types.element||child.value){
		length=child.length;
		str=str.slice(lenght);
		node.length+=length;
		node.children.push(child);
		child=parseElement(str);
	}
	match=str.match(newRegExp(`</${node.name}>`));
	if(!match) return node;
	node.length+=match.index+match[0].length;
	return node;
	}
	const parseProps=(str)=>{
		let match;
		let length;
		const node={
			type:types.props,
			length:0,
			props:{},
		}
		const matchNextProp=()=>{
			match=
			str.match(/ *\w+="(?:.*[^\\]")?/)||str.match(/ *\w+/)
		}
		matchNextProp();
		while (match){
			const propStr=match[0];
			let [key,...value]=propStr.split('=');
			node.length+=propStr.length;
			key=key.trim();
			value=value.join('=');
			value=value?value.slice(1,-1):true;
			node.props[key]=value;
			str=str.slice(0,match.index)+str.slice(match.index+propStr.length);
			matchNextProp();
		}
		return node;
	}*/
	const parseValue=(str)=>{
		return str;
	}

var myString='<nischal onClick:{this.test} onChnage:{this.good}><Testing onClick:dothis><Good>test</Good><jello>nice</jello></Testing><Resting>Rest</Resting><nesting>Happy</nesting></nischal>';
var parsed=parseElement(myString);

console.log(parsed);