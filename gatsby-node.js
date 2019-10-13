const path = require('path');

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        return result;
      })
    );
  });

// Implement the Gatsby API 'createPages'. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  // Create pages for each blog.
  const getBook = makeRequest(
    graphql,
    `
    query {
      allContentfulBooks (
        sort: {fields: [createdAt], order: DESC }
        filter: {
          node_locale: {eq: "en-US"}
        },
      )
      {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  
  `
  ).then(result => {
    result.data.allContentfulBooks.edges.map(({ node }) => {
      createPage({
        path: `books/${node.slug}`,
        component: path.resolve(`src/templates/book.js`),
        context: {
          id: node.id,
        },
      });
    });
  });

  // Create archive page for each books, including pagination.
  const getArchive = makeRequest(
    graphql,
    `
    query {
      allContentfulBooks (
        sort: {fields: [createdAt], order: DESC }
        filter: {
          node_locale: {eq: "en-US"}
        },
      )
      {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  
  `
  ).then(result => {
    const books = result.data.allContentfulBooks.edges;
    const booksPerPage = 2;
    const numPages = Math.ceil(books.length / booksPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/books` : `/books/${i + 1}`,
        component: path.resolve('./src/templates/archive.js'),
        context: {
          limit: booksPerPage,
          skip: i * booksPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });

  // // create short story category page, including pagination.
  // const getshortstories = makerequest(
  //   graphql,
  //   `
  //   query {
  //     allcontentfulbooks (
  //       sort: {fields: [createdat], order: desc }
  //       filter: {
  //         node_locale: {eq: "en-us"}
  //         category: {elemmatch: {category: {eq: "short stories"}}}
  //       },
  //     )
  //     {
  //       edges {
  //         node {
  //           id
  //           slug
  //         }
  //       }
  //     }
  //   }

  // `
  // ).then(result => {
  //   const books = result.data.allcontentfulbooks.edges;
  //   const booksperpage = 2;
  //   const numpages = math.ceil(books.length / booksperpage);

  //   array.from({ length: numpages }).foreach((_, i) => {
  //     createpage({
  //       path:
  //         i === 0
  //           ? `/category/shortstories`
  //           : `/category/shortstories/${i + 1}`,
  //       component: path.resolve('./src/templates/shortstories.js'),
  //       context: {
  //         limit: booksperpage,
  //         skip: i * booksperpage,
  //         numpages,
  //         currentpage: i + 1,
  //       },
  //     });
  //   });
  // });

  return Promise.all([getBook, getArchive]);
};
