import { gql } from "@apollo/client";

//looks for all the beans, category is avaialble but not implemented in front end UI yet
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

//looks for a single bean
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

//queries the user schema

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
