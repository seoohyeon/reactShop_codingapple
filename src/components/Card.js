import { useContext } from "react";
import { 재고context } from "../App"

function Card(props){

    let 재고 = useContext(재고context); // ()안에 범위를 작성함.

    return(
        <div className='col-md-4'>
            <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="100%"></img>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content} </p>
            <p>{props.shoes.price}원 </p>
            {재고[props.i]}
            <Test></Test>  {/* component안에 또 component 만들어 호출*/}
        </div>
    )
}
function Test(){
    let 재고 = useContext(재고context);
    return(
        <p>재고 : {재고[0]}</p>
    )
}

export default Card;