import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import '../Detail.scss';

let Box = styled.div`
    padding:20px;
`;

let Title = styled.h4`
    font-size:25px;
    color: ${props => props.color}
`;

function Detail(props){
    let [alert, setAlert] = useState(true);
    let [inputData, setInputData] = useState('');

    let [누른탭, 누른탭변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);

    useEffect(()=>{ // detail component가 등장시 실행할 코드&업데이트시 실행할 코드

        // axios.get()

        // 2초 후에 저기 alert 창을 안보이게 해주어라.
        let timer = setTimeout(()=>{ setAlert(false)}, 2000);
        console.log("rr")

        return () => { clearTimeout(timer) }  // component가 사라질 때, 타이머를 없애는 코드 추가하는 것이 좋음

    },[alert]); // alert라는 state가 변경될때만 실행(특정state가 변경될때만 실행)
    // [alert, inputData] 이런식으로 원하는 state 다 적어도 됨
    // 만약 [ ] 비어있다면, 딱 페이지 등장시 한번 실행하고 끝남. 그뒤로는 업데이트되어도 영영 안됨.

    let { id } = useParams();
    let history = useHistory();
    let findShoes = props.shoes.find(function(x){    // x = 상품임.
        return x.id == id
    }) // 그냥 바로 x => x.id == id 해도 됨

    return(
        <div className="container">
            <Box>
                <h4 className='red'>hii</h4>
                <Title color='red'>Detail</Title>
                <Title color='blue'>Detail</Title>
            </Box>

            { inputData }
            <input onChange={(e)=>{setInputData(e.target.value)}} />
            {/* e.target.value = 지금 input에 입력된 데이터 값 */}

            { 
                alert === true
                ? ( <div className='my-alert-red'>
                <p>재고가 얼마 남지 않았습니다.</p>
                </div>)
                : null
            }
           
            <div className="row">
                <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes"+id+".jpg"} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5">{findShoes.title}</h4>
                <p>{findShoes.content}</p>
                <p>{findShoes.price}원</p>

                <Info 재고={props.재고}></Info>



                <button className="btn btn-danger" onClick={()=>{
                    props.재고변경([9,10,11]) 
                }}>주문하기</button> 
                <button className="btn btn-danger" onClick={() => { 
                    history.goBack();
                    // history.push('/') : ()안의 경로로 이동
                 }}>뒤로가기</button> 
                </div>
            </div>
            
            <Nav className="mt-5" variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0) }}>Option 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1) }}>Option 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{ 누른탭변경(2) }}>Option 3</Nav.Link>
                </Nav.Item>
            </Nav>

            <CSSTransition in={스위치} classNames="wow" timeout={500}>
                <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
            </CSSTransition>

        </div>
    )
}
// if문을 이용해 조건이 3개,4개인 것을 만들어줄때는 => 컴포넌트를 만들어주는게 좋다
function TabContent(props){

    useEffect(()=>{
        props.스위치변경(true);
    })


    if(props.누른탭 === 0){
        return <div>0번째 내용입니다.</div>
    } else if(props.누른탭 === 1){
        return <div>1번째 내용입니다.</div>
    } else if(props.누른탭 === 2){
        return <div>2번째 내용입니다.</div>
    }
}



function Info(props){
    return(
        <p>재고 : {props.재고[0]} </p>
    )
}

export default Detail;
 