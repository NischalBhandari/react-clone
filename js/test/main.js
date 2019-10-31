import h from './hyperscript.js'
import Component from './component.js'
import { diff } from './v-dom.js';

class App extends Component {
  render() {
    return h('div', { class: 'app' },
      h(Game)
    )
  }
};

class Game extends Component{
    constructor(props){
      super(props);
      this.state={ 
        history:[{
          squares:Array(9).fill(null),
        }],
        stepNumber:0,
        xIsNext:true,
         player1:'X',
         player2:'O',
         list:0,
      }
    }
/*    jumpTo(step,that){
      const history=this.state.history.slice();
      history.pop();
      if(this.state.stepNumber-1>0){
      this.setState({
        history:history,
        stepNumber:this.state.stepNumber-1,
        xIsNext:!this.state.xIsNext,
      });
    }
    }*/
    jumpTo(step,that){
      const history=this.state.history;
      console.log(history,this.state.stepNumber,"history in step");
      this.setState({
        history:history,
        stepNumber:step,
        xIsNext:(step%2)===0
      });
      console.log("this is step 2",this.state.stepNumber)
    }

      changePlayer(e){
    this.setState({
      player1:e.target.value,
    })
  }
    handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber:history.length,
      xIsNext: !this.state.xIsNext,
    });
    }
    componentDidMount(){
/*      var that=this;
      setInterval(function(){
        that.setState({
          list:that.state.list+1
        })
      },1000);*/
    }
    render(){
      console.log(" history in step called render");
      console.log(this.state.history,this.state.stepNumber," history in step called render");
      const history = this.state.history.slice();

      const current=history[this.state.stepNumber];

      const winner=calculateWinner(current.squares);
      const moves = history.map((step,move)=>{
        const desc=move ? 'Go to move #' + move : 'Go to game start';

        return (
          h('li' , {}, h('button',{onClick:this.jumpTo.bind(this,move)},desc))

          )
      })
      let status;
      if(winner){
        status='Winner:'+winner;
      }
      else{
        status='Next player: '+ (this.state.xIsNext? this.state.player1:this.state.player2);
      }
      return(
        h('div',{class:"game"},h('div',{class:'game-board'},h(Board,{squares:current.squares,onPass:this.handleClick.bind(this)})),h('div',{class:'game-info'},h('div',{},status),h('ol',{},...moves)),        h('input',{onInput:this.changePlayer.bind(this)},"none"),
        h('input',{value:`${this.state.test}`},),h('div',{},this.state.list))
      );
  }
}


class Board extends Component{
  constructor(props){
    super(props);
    this.state={
     list:1
    }
  }
  componentDidMount(){
  }
  renderSquare(i){

    return h(Square,{value:`${this.props.squares[i]}`,onTest:this.props.onPass.bind(this,i)});
  }

/*  handleClick(e,i){
    //create copy of the squares and circumvent mutability 
    let squares = this.state.squares.slice() ;
    if (calculateWinner(squares)||squares[e]){
      return ;
    }
    squares[e]=this.state.xIsNext?'X':'O';
    console.log(squares,"this is squares 1")

    this.setState({
      squares:squares,
      xIsNext:!this.state.xIsNext,
    });
    console.log(this.state.xIsNext,"this is squares");
  }*/

  render(){
    return (
            h('div',{},h('div',{class:'board-row'},this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)),
        h('div',{class:'board-row'},this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)),
        h('div',{class:'board-row'},this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)),



        )

      )
  }
}
class Square extends Component{
  constructor(props){
    super(props);
    this.state={
      value:null,
    };
  }

  componentDidMount(){
    console.log("Square component mounted");
  }
  componentWillUpdate(){
    console.log("square component will update");
  }
  render(){
    return h('button',{class:`${this.props.value}`,onClick:this.props.onTest.bind(this)}
      );
  }
}
function calculateWinner(squares){
  const lines=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

    for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

var vnode=h(App);
parent=document.getElementById('app');
const primaryRender = (vnode, parent) => {
  var patch=diff(undefined, vnode, parent);
  console.log("app vnode",vnode)
  patch(parent);
}
primaryRender(vnode,parent);