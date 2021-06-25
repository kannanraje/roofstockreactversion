import React from "react";
import "./ToolBar.css";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";

const toolBar = (props) => {
  return (
    <div className="ToolBar">
      <Container>
        <Navbar variant="dark">
          <Nav className="menu">
            <Nav.Link href="/Properties">Properties</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};
export default toolBar;
