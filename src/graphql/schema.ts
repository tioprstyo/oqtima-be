import { gql } from 'apollo-server-core';

const schema = gql`
  scalar Date
  
  type Query {
    cardData: [cardData!]!
  }

  type cardData {
    id: ID!
    title: String!
    status: String!
    caption: String!
    description: String!
    prioirty: String!
    tags: String!
    storyPoint: String!
    assignee: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;

export default schema;