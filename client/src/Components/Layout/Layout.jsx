import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author}></meta>
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <ToastContainer/>
      <main>{props.children}</main>
      <Footer />
    </div>
  );
  
};
Layout.defaultProps = {
  title: "Shopnow-Ecommerce app",
  description : "Mern Stack Project",
  keywords : "mern, react, mongodb, node",
  author: "Moavia"
}
export default Layout;
