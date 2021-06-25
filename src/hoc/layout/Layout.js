import React, { Component } from "react";
import Auxiliary from "../auxiliary/Auxiliary";
import "./Layout.css";
import ToolBar from "../../components/toolbar/ToolBar";
import { Container } from "react-bootstrap";
class Layout extends Component {
  render() {
    return (
      <Auxiliary>
        <ToolBar />
        <Container className="ContainerStyle">{this.props.children}</Container>
      </Auxiliary>
    );
  }
}
export default Layout;
