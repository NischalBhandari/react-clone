class People extends Component{
	render(props,state){
		return h(
			'ul',null,...props.list.map(item=>h('li',null,item))
			)
	}
}