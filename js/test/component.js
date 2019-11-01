import { renderComponent } from './v-dom.js';

export default class Component {
  constructor(props) {
    this.state = null;
    this.props=props|| {};
    this.first=true; 
  }
  setState(state) {
/*    console.log("called this setState")
    if(this.first){
      renderComponent(this);
      this.first=false;
    }*/

    var shouldUpdate=this.shouldComponentUpdate(state);
    console.log("should component update called ", shouldUpdate);
    if(shouldUpdate){
/*    this.state=Object.assign({},state);*/
    for(const [k,v] of Object.entries(state)){
      if(v!=this.state[k]){
        this.state[k]=v;
      }
      else{
      }
    }
    this.componentWillUpdate();
    renderComponent(this);
  this.componentDidUpdate();
	}
  }
  static render(){
    console.log("static render");
  }
  componentWillMount(){
  	undefined;
  }
  componentDidMount(){
  	undefined;
  }
  componentWillUnmount(){
  	console.log("component unmounted");
  }
  shouldComponentUpdate(newState){
    	for (const [k,v] of Object.entries(newState)){
  		if(this.state[k]!=newState[k]){
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
    undefined;
  }
  componentDidUpdate(){
    undefined;
  }
  getNewProps(){
  }
}