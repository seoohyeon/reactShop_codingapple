import React, { useState, useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import './App.css';
import Data from './components/Data';
import Card from './components/Card';
import Detail from './components/Datail';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom'

export let 재고context = React.createContext();


function App() {

  let [shoes, shoesSet] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]); // 중요한 state데이터들은 상위component에 보관


  return (
    <div className="App">
      
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/detail'>Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Switch>

      <Route exact path="/">
      <div className='Jumbotron'>
        <h2> 20% Season off </h2>
        <p> This is a simple hero unit, a simple jumbotron style component <br />
            for calling extra attention to featured content or information. </p>
        <Button variant="primary">Learn more</Button>
      </div>

      <div className='container'>

        <재고context.Provider value={재고}>

        <div className='row'>
          {
            shoes.map((a, i)=>{ // a는 데이터 하나하나, i는 정수
              return(<Card shoes={shoes[i]} i={i} key={i}/>)
              // return(<Card shoes={a} />)
            })
          }
        </div>

        </재고context.Provider>

        <button className='btn btn-primary' onClick={()=>{
          // axios.post('데이터전송할URL', {전송원하는데이터, id : 'a', pw : '1234'}).then((result)=>{}) 혹은 .catch(()=>{})

          // axios를 쓰면 JSON => Object로 알아서 바꿔서 가져옴.
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{ // 성공하면.then()

           shoesSet([...shoes, ...result.data]); // 버튼 누르면 ajax요청으로 데이터를 가져오고, 그것을 shoes라는 state에 추가함.
          }) 
          .catch(()=>{ // 실패하면.catch()

          }) 

        }}>더보기</button>
      </div>
      </Route>
      <Route path="/detail/:id">
        <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/> {/*작명={state명} */}
      </Route>

      <Route path="/:id">   {/* /모든문자 라는 경로를 의미함 */}
          <div>아무거나적었을때 이거 보여주삼</div>
      </Route>

    </Switch>   
    {/* 이렇게 Switch로 감싸줘야 여러개 중복이 안되고 하나당 하나에만 적용되게 됨 */}


    </div>
  );
}

export default App;
