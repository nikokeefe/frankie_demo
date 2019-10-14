import React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';

import './home.css';

export default () => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        allContentfulBooks(
          limit: 9
          sort: { fields: [createdAt], order: DESC }
          filter: {
            node_locale: { eq: "en-US" }
            featured: { eq: false }
            home: { eq: true }
          }
        ) {
          edges {
            node {
              id
              slug
              title
              category {
                title
                id
              }
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
      <>
        <div className="card__category">Other titles available</div>
        <div className="feed">
          {data.allContentfulBooks.edges.map(edge => (
            <div
              key={edge.node.id}
              className="card"
              style={{
                backgroundImage: `linear-gradient(
                  to bottom,
                  rgba(10,10,10,0) 0%,
                  rgba(10,10,10,0) 50%,
                  rgba(10,10,10,0.7) 100%),
                  url(${edge.node.featuredImage.fluid.src})`,
              }}
              onClick={() => navigate(`/books/${edge.node.slug}`)}
            >
              {/* {edge.node.category.map(category => (
                <p className="card__category">{category.title}</p>
              ))}
              <p className="card__title">{edge.node.title}</p> */}
            </div>
          ))}
        </div>
      </>
    )}
  />
);
