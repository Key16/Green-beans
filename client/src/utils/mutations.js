import { gql } from "@apollo/client";

//logs user in, gets token back

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

//creates a new bean

export const ADD_BEAN = gql`
  mutation addBean(
    $title: String!
    $description: String!
    $image: String
    $beanAuthor: String
    $donation: Int
  ) {
    addBean(
      title: $title
      description: $description
      image: $image
      beanAuthor: $beanAuthor
      donation: $donation
    ) {
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
    }
  }
`;

//creates a new user returns auth token

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

//removes the bean

export const REMOVE_BEAN = gql`
  mutation removeBean($beanId: ID!) {
    removeBean(beanId: $beanId) {
      _id
      title
      description
      image
      beanAuthor
      donation
      createdAt
    }
  }
`;
