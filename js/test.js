import createElement from './createElement.js';
import render from './render.js';
import mount from './mount.js';
import diff from './difffxn.js';
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
			onclick:`${count++}`,
		},
		children:["my button"]
	}),
	],
});
let count =0;
let vApp=createVApp(count);
const $app=render(vApp);
let $rootEl=mount($app,document.getElementById('app'));

setInterval(()=>{
	count++;
	const vNewApp=createElement('div',{attrs:{class:`test${count}`},});
	console.log(vNewApp,"this is the new app");
	console.log(vApp,"this is the old app");
	const patch=diff(vApp,vNewApp);
	//for changes in dom
	$rootEl=patch($rootEl);
	// for changes in vdom tree
	vApp=vNewApp;
},1000);