import React from "react";
import ReactDOM from "react-dom";
import Header from "./neighborhoods/Header.js";
import Footer from "./neighborhoods/Footer.js";

class Demo extends React.Component {
  render() {
    return (
      <div className="demo">
        <Header />
        <Footer />
      </div>
    );
  }
}
module.exports = Demo;
