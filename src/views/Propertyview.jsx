import React, { Component } from "react";
import Data from "../data/Properties.json";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faList,
  faDigitalTachograph,
} from "@fortawesome/free-solid-svg-icons";
import DetailsView from "../components/Detailsview";
import "./Propertyview.css";
import { Button } from "bootstrap";
class Propertyview extends Component {
  state = {
    propertyData: [],
    imageClicked: false,
    viewData: [],
    userView: "cardview",
    showViewAs: true,
  };

  formatAddress = (address) => {
    let formattedAddress = null;

    if (address != null) {
      formattedAddress =
        address.address1 === null || address.address1 === ""
          ? ""
          : address.address1;
      formattedAddress =
        address.address2 === null || address.address2 === ""
          ? ""
          : formattedAddress + " " + address.address2;
      formattedAddress =
        address.city === null || address.city === ""
          ? ""
          : formattedAddress + " " + address.city;
      formattedAddress =
        address.state === null || address.state === ""
          ? ""
          : formattedAddress + " " + address.state;
      formattedAddress =
        address.country === null || address.country === ""
          ? ""
          : formattedAddress + " " + address.country;
    } else {
      formattedAddress = "NA";
    }

    return formattedAddress;
  };

  formatPrice = (price) => {
    return price == "NA" ? price : "$" + price;
  };
  getPropertyDataFromJson = () => {
    return Data.properties.map((property, idx) => ({
      Id: property.id,
      AccountId: property.accountId,
      MainImageUrl:
        property.mainImageUrl != null
          ? property.mainImageUrl
          : "https://roofstock-cdn4.azureedge.net/rs-one/images/houses/empty-photo.png",
      Address: this.formatAddress(property.address),
      Yearbuilt:
        property.physical !== null && property.physical.yearBuilt !== null
          ? property.physical.yearBuilt
          : "NA",
      ListPrice:
        property.financial != null && property.financial.listPrice != null
          ? property.financial.listPrice
          : "NA",
      MonthlyRent:
        property.financial != null && property.financial.monthlyRent != null
          ? property.financial.monthlyRent
          : "NA",
      GrossYield:
        property.financial != null &&
        property.financial.listPrice != null &&
        property.financial != null &&
        property.financial.monthlyRent != null
          ? (
              (property.financial.monthlyRent * 12) /
              property.financial.listPrice
            ).toFixed(2)
          : "NA",
    }));
  };

  async componentDidMount() {
    //read Json
    this.setState({
      propertyData: this.getPropertyDataFromJson(),
    });
  }
  handleRoute = (data) => {
    this.setState({ imageClicked: true, viewData: data, showViewAs: false });
  };
  handleViewAsClick = (useroption) => {
    this.setState({ userView: useroption });
  };
  getActiveIcon = (source) => {
    return this.state.userView === source ? "blue" : "";
  };
  render() {
    console.log(this.state.propertyData);
    return (
      <div>
        <div
          className="viewas"
          style={{ display: this.state.showViewAs ? "block" : "none" }}
        >
          <FontAwesomeIcon
            icon={faThLarge}
            className="zoom"
            style={{ backgroundColor: this.getActiveIcon("cardview") }}
            onClick={() => this.handleViewAsClick("cardview")}
          />
          <FontAwesomeIcon
            icon={faList}
            className="zoom"
            style={{ backgroundColor: this.getActiveIcon("listview") }}
            onClick={() => this.handleViewAsClick("listview")}
          />
        </div>
        {this.state.imageClicked ? (
          <DetailsView data={this.state.viewData}></DetailsView>
        ) : this.state.userView === "cardview" ? (
          <CardDeck className="carddeckview">
            {this.state.propertyData.map((data, key) => (
              <Card className="cardview">
                <Card.Img
                  className="cardimageview"
                  variant="top"
                  src={data.MainImageUrl}
                  onClick={() => this.handleRoute(data)}
                />

                <Card.Body className="border cardbodyview">
                  <Container style={{ padding: "5px" }}>
                    <Row className="border" style={{ padding: "5px" }}>
                      <Col>
                        <Row> ListPrice</Row>
                        <Row> {this.formatPrice(data.ListPrice)}</Row>
                      </Col>
                      <Col>
                        <Row>Monthly Rent</Row>
                        <Row>{this.formatPrice(data.MonthlyRent)}</Row>
                      </Col>
                    </Row>
                    <Row className="border" style={{ padding: "5px" }}>
                      <Col>
                        <Row>GrossYield</Row>
                        <Row>{data.GrossYield}</Row>
                      </Col>
                      <Col>
                        <Row>Year Built</Row>
                        <Row>{data.Yearbuilt}</Row>
                      </Col>
                    </Row>
                    <Row className="border cardviewAddress">
                      <Col>{data.Address}</Col>
                    </Row>
                  </Container>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            ))}
          </CardDeck>
        ) : (
          <ul class="list-group">
            <li class="list-group-item">
              <div className="container">
                <table>
                  <thead>
                    <tr>
                      <th className="tableheaderbig"></th>
                      <th className="tableheaderbig">Address</th>
                      <th className="tableheadermedium">List Price</th>
                      <th className="tableheadermedium">Monthly Rent</th>
                      <th className="tableheadermedium">Gross Yield</th>
                      <th className="tableheadermedium">Year Built</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.propertyData.map((data, key) => (
                      <tr>
                        <td>
                          <img
                            src={data.MainImageUrl}
                            className="tablerowimage"
                          />
                        </td>
                        <td> {data.Address}</td>
                        <td>{this.formatPrice(data.ListPrice)}</td>
                        <td> {this.formatPrice(data.MonthlyRent)}</td>
                        <td>{data.GrossYield}</td>
                        <td>{data.Yearbuilt}</td>
                        <td>
                          <input
                            type="button"
                            className="btn-primary"
                            value="See Details"
                            onClick={() => this.handleRoute(data)}
                          ></input>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default Propertyview;
