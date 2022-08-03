import { gql } from "@apollo/client";

export const QUERY_BEANS = gql`
  query getBeans($category: ID) {
    beans(category: $category) {
      _id
      title
      description
      image
      beanAuthor
      donation
      createdAt
      category {
        _id
      }
      donaters {
        _id
        donatedAmount
      }
    }
  }
`;

export const QUERY_SINGLE_BEAN = gql`
  query getSingleBean($beanId: ID!) {
    bean(beanId: $beanId) {
      _id
      title
      description
      image
      beanAuthor
      donation
      createdAt
      category {
        _id
      }
      donaters {
        _id
        donatedAmount
      }
    }
  }
`;

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

// export const QUERY_ALL_PRODUCTS = gql`
//   {
//     products {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//         name
//       }
//     }
//   }
// `;

// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      bean {
        _id
        title
        description
        image
        beanAuthor
        donation
        createdAt
      }
    }
  }
`;
