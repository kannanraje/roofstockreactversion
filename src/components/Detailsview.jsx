import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const formatPrice = (price) => {
  return price == "NA" ? price : "$" + price;
};
export default function Detailsview(props) {
  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <a href="/">
          <button type="button" class="btn btn-primary btn-arrow-left">
            Back
          </button>
        </a>
      </div>
      <Card className="cardview">
        <Card.Img
          className="cardimageview"
          variant="top"
          src={props.data.MainImageUrl}
        />

        <Card.Body className="border cardbodyview">
          <Container style={{ padding: "5px" }}>
            <Row className="border" style={{ padding: "5px" }}>
              <Col>
                <Row> ListPrice</Row>
                <Row> {formatPrice(props.data.ListPrice)}</Row>
              </Col>
              <Col>
                <Row>Monthly Rent</Row>
                <Row>{formatPrice(props.data.MonthlyRent)}</Row>
              </Col>
            </Row>
            <Row className="border" style={{ padding: "5px" }}>
              <Col>
                <Row>GrossYield</Row>
                <Row>{props.data.GrossYield}</Row>
              </Col>
              <Col>
                <Row>Year Built</Row>
                <Row>{props.data.Yearbuilt}</Row>
              </Col>
            </Row>
            <Row
              className="border"
              style={{ padding: "5px", "text-align": "center" }}
            >
              <Col>{props.data.Address}</Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}
