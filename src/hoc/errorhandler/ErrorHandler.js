import React, { Component } from "react";
import Auxiliary from "../auxiliary/Auxiliary";
const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(
        (req) => {
          console.log("ErrorHandler(request-Success)", req);
          return req;
        },
        (error) => {
          this.setState({ error: error });
          console.log("ErrorHandler(request-Error)", error);
        }
      );
      this.resInterceptors = axios.interceptors.response.use(
        (res) => {
          console.log("ErrorHandler(response-Success)", res);
          return res;
        },
        (error) => {
          this.setState({ error: error });
          console.log("ErrorHandler(response-Error)", error);
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }
    render() {
      return (
        <Auxiliary>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};
export default errorHandler;
