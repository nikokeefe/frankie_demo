import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Nav from '../components/Nav';
import Featured from '../components/Featured';
import Home from '../components/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/seo';

import './index.css';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Nav />
    <Header />
    <Featured />
    <Home />
    <Link to="/books" className="view_more">
      View More
    </Link>
    <Footer />
  </Layout>
);

export default IndexPage;
