import React, { Fragment } from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';

import './featured.css';

export default () => (
  <StaticQuery
    query={graphql`
      query FeaturedQuery {
        allContentfulBooks(
          limit: 1
          sort: { fields: [createdAt], order: DESC }
          filter: { node_locale: { eq: "en-US" }, featured: { eq: true } }
        ) {
          edges {
            node {
              id
              slug
              title
              shortDescription
              featuredImage {
                fluid(maxWidth: 1200, quality: 85) {
                  src
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        {data.allContentfulBooks.edges.map(edge => (
          <div key={edge.node.id} className="header__section">
            <div
              className="header__hero"
              style={{
                backgroundImage: `url(${edge.node.featuredImage.fluid.src})`,
              }}
            ></div>
            <div className="header__content">
              <div className="header__info">
                <h1 className="header__title">{edge.node.title}</h1>
                <p className="header__subtitle">{edge.node.shortDescription}</p>
                <button
                  onClick={() => navigate(`/books/${edge.node.slug}`)}
                  className="btn__med"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    )}
  />
);
