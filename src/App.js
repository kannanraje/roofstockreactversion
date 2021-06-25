import "./App.css";
import Layout from "../src/hoc/layout/Layout";
import { BrowserRouter, Route } from "react-router-dom";
import Propertyview from "../src/views/Propertyview";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Route path="/" component={Propertyview}></Route>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
