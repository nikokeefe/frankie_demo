import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Nav from '../components/Nav';
import SEO from '../components/seo';

import './book.css';

const BookTemplate = props => {
  return (
    <Layout>
      <SEO
        title={props.data.contentfulBooks.seoTitle}
        description={props.data.contentfulBooks.seoDescription}
        keywords={props.data.contentfulBooks.seoKeywords}
      />
      <Nav />
      <div className="book__header">
        <div
          className="book__hero"
          style={{
            backgroundImage: `url(${props.data.contentfulBooks.featuredImage.fluid.src})`,
          }}
        ></div>
        <div className="book__info">
          <h1 className="book__title">{props.data.contentfulBooks.title}</h1>
        </div>
      </div>
      <div className="book__wrapper">
        <div className="book__content center">
          <div
            dangerouslySetInnerHTML={{
              __html: `${props.data.contentfulBooks.content.childMarkdownRemark.html}`,
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export default BookTemplate;

export const query = graphql`
  query BookTemplate($id: String!) {
    contentfulBooks(id: { eq: $id }) {
      title
      id
      slug
      content {
        childMarkdownRemark {
          html
        }
      }
      seoTitle
      seoDescription
      seoAuthor
      seoKeywords
      seoImage {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyContentfulFluid
          src
        }
      }
      featuredImage {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyContentfulFluid
          src
        }
      }
    }
  }
`;
