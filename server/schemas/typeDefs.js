const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Bean {
    _id: ID
    title: String
    description: String
    image: String
    beanAuthor: String
    createdAt: String
    donation: Float
    category: Category
    donaters: [Donation]
  }

  type Donation {
    _id: ID
    donatedAmount: Float
    donaterName: String
    donaterId: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    bean: [Bean]
    donaters: [Donation]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    beans(category: ID): [Bean]
    bean(_id: ID!): Bean
    user: User
    userDonations: User
    beanDonations: Bean
    # checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addBean(
      title: String!
      description: String!
      image: String
      donation: Int
    ): Bean
    removeBean(beanId: ID!): Bean
    addDonation(donatedAmount: Int!, beanId: String): Donation
  }
`;

module.exports = typeDefs;
