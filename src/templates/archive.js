import React from 'react';
import { Link, graphql, navigate } from 'gatsby';
import { window } from 'browser-monads';
import Layout from '../components/layout';
import Nav from '../components/Nav';
import SEO from '../components/seo';
import '../components/Home/home.css';
import './archive.css';

import headerImg from '../images/general-header-image.jpg';

const Archive = props => {
  const bookContent = props.data.allContentfulBooks;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/books' : `/books/${currentPage - 1}`;
  const nextPage = `/books/${currentPage + 1}`;

  return (
    <Layout>
      <SEO title="Books" keywords={['short stories', 'poems']} />
      <Nav />

      <header>
        <div className="archive__section">
          <div
            className="archive__hero"
            style={{ backgroundImage: `url(${headerImg})` }}
          ></div>
          <div className="archive__nav">
            <Link
              to="/books"
              className={
                window.location.href.indexOf('/books') > 0
                  ? 'archive__nav--link selected'
                  : 'archive__nav--link'
              }
            >
              All
            </Link>
            <Link
              to="/category/shortStories"
              className={
                window.location.href.indexOf('category/shortStories') > 0
                  ? 'archive__nav--link selected'
                  : 'archive__nav--link'
              }
            >
              Short Stories
            </Link>
            <Link
              to="/category/poems"
              className={
                window.location.href.indexOf('category/poems') > 0
                  ? 'archive__nav--link selected'
                  : 'archive__nav--link'
              }
            >
              Poems
            </Link>
            <Link
              to="/category/novel"
              className={
                window.location.href.indexOf('category/novel') > 0
                  ? 'archive__nav--link selected'
                  : 'archive__nav--link'
              }
            >
              Novels
            </Link>
          </div>
        </div>
      </header>

      <div className="feed">
        {bookContent.edges.map(edge => (
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
            {edge.node.category.map(category => (
              <p className="card__category">{category.title}</p>
            ))}
            <p className="card__title">{edge.node.title}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <div className="pagination__item">
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              <div className="arrow__back"></div>
            </Link>
          )}
        </div>
        <div className="pagination__item">
          {!isLast && (
            <Link to={nextPage} rel="next">
              <div className="arrow__next"></div>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Archive;

export const pageQuery = graphql`
  query ArchiveQuery($skip: Int!, $limit: Int!) {
    allContentfulBooks(
      sort: { fields: [createdAt], order: DESC }
      filter: { node_locale: { eq: "en-US" } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          slug
          title
          createdAt
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
`;
