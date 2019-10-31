import { renderComponent } from './v-dom.js';

export default class Component {
  constructor(props) {
    this.state = null;
    this.props=props|| {};
    this.first=true; 
  }
  setState(state) {
     console.log(state,this.state,"state changed");
    if(this.first){
      renderComponent(this);
      this.first=false;
    }

    var shouldUpdate=this.shouldComponentUpdate(state,this.props);
    if(shouldUpdate){
/*    this.state=Object.assign({},state);*/
    for(const [k,v] of Object.entries(state)){
      if(v!=this.state[k]){
        this.state[k]=v;
      }
      else{
      }
    }
    console.log(state,this.state,"state changed");
    this.componentWillUpdate();
    renderComponent(this);
  this.componentDidUpdate();
	}
  }
  static render(){
    console.log("static render");
  }
  componentWillMount(){
  	console.log("component will mount");
  }
  componentDidMount(){
  	undefined;
  }
  componentWillUnmount(){
  	console.log("component unmounted");
  }
  shouldComponentUpdate(newState,newProps){
  	console.log(this.props,newProps,"this is the prevState and new state");
    	for (const [k,v] of Object.entries(this.state)){
  		if(v!=newState[k]){
  			console.log("states are different so update ",v,newState[k]);
  			return true;
  		}
  	}  	
  	return false;  	 
/*    if(this.state!=newState){
      return true;
    }
    else{
      return false;
    }*/
  	}
  componentWillUpdate(){
    console.log('component will update now ');
  }
  componentDidUpdate(){
    console.log('component has updated');
  }
  getNewProps(){
  }
}