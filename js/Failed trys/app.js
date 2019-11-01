import vElement from './main.js';
import mount from './mount.js';
import update from './update.js';
import diff from './diff.js';
var root=document.body;
var myobj={
	tag:'div',
	attributes:{
		class:'my-class',
		id:'app',
		key:1,
	},
	dom: root,
	children:	[
	{tag:'div',
	attributes:{
		class:'button-test',
		key:2,
		id:'test',
	},
	dom:null,
	children:[
		'hello no 1'

	]
	},
	{
		tag:'button',
		attributes:{
			class:'my-button',
			id:'button tool',
			key:3,
		},
		dom:null,
		children:[
			'my test'
		]
	},
	{
		tag:'input',
		attributes:{
			type:'text',
			key:4,
			id:'input tool'
		},
		dom:null,
		children:[]
	},
	{
		tag:'div',
		attributes:{
			id:"test1",
			key:5,
		},
		dom:null,
		children:[

		{
			tag:'button',
			attributes:{
				id:'test2',
				key:6,
			},
			dom:null,
			children:[]
		}]
	}
	]
}
var myobj1;
var app=0;
var childrenTest=0;
var buttonTest=0;
setInterval(function(){
	
	childrenTest+=1;
	buttonTest+=2;
	app+=1;
	myobj1={
	tag:'div',
	attributes:{
		class:'my-class',
		id:app,
		key:6,
	},
	dom: root,
	children:	[
	{tag:'div',
	attributes:{
		class:'button-test',
		key:7,
		id:'test',
	},
	dom:null,
	children:[
		'hello no 1'

	]
	},
	{
		tag:'button',
		attributes:{
			class:'my-button',
			id:'button tool',
			key:8,
		},
		dom:null,
		children:[
			buttonTest
		]
	},
	{
		tag:'input',
		attributes:{
			type:'text',
			value:childrenTest,
			key:9,
			id:'mytest',
		},
		dom:null,
		children:[]
	},
	{
		tag:'div',
		attributes:{
			id:"test1",
			key:10,
		},
		dom:null,
		children:[

		{
			tag:'button',
			attributes:{
				id:'test2',
				key:11,
				value:buttonTest,
			},
			dom:null,
			children:[]
		}]
	}
	]
}
},500);

var myapp=document.getElementById('app');
var xyz=new vElement(myobj);
var mydom=xyz.mountVElement();
var updated=mount(mydom.vElement,myapp);
mydom.vElement=updated;
var updateapp;
var updatedom;
setInterval(function(){
	updateapp=new vElement(myobj1);
	updatedom=updateapp.mountVElement();
	var patch=diff(mydom,updatedom);
	console.log(patch);
	console.log(mydom.vElement,"before patch");
	mydom=patch(mydom.vElement);
	console.log(mydom.vElement,"after patch");

},1000);
