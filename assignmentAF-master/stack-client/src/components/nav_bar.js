import React from 'react';
import '../App.css';
import { Navbar , Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class nav extends React.Component {
  
  Logout = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  render() {
    if(localStorage.getItem('email')){
      if(localStorage.getItem('type')==="admin"){
        return (
          <Navbar bg="secondary" variant="dark">
            <Navbar.Brand href="/">STORE</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
                <Nav.Link href="/usersList" >Users</Nav.Link>
                <Nav.Link href="/category" >Category</Nav.Link>
                <Nav.Link onClick={ this.Logout } >Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }else if(localStorage.getItem('type')==="sm"){
        return (
          <Navbar bg="secondary" variant="dark">
            <Navbar.Brand href="/">STORE</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
                <Nav.Link href="/product" >Product</Nav.Link>
                <Nav.Link onClick={ this.Logout } >Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }else{
        return (
          <Navbar bg="secondary" variant="dark">
            <Navbar.Brand href="/">STORE</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
                <Nav.Link href="/cart" >Shopping Cart</Nav.Link>
                <Nav.Link onClick={ this.Logout } >Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
    }else{
      return (
        <Navbar bg="secondary" variant="dark">
          <Navbar.Brand href="/">STORE</Navbar.Brand>
    
          <Navbar.Collapse class="collapse navbar-collapse">
            <Nav class="navbar-nav ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

  }
}

export default nav;