import { gql } from "@apollo/client";

export const DELETE_POST = gql`
  mutation deletePostById($id: ID!) {
    deletePostById(id: $id) {
      id
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($id: ID!, $token: String!) {
    likePost(id: $id, token: $token) {
      id
    }
  }
`;

export const ADD_POST = gql`
  mutation createPost($title: String!, $content: String!, $postedBy: String!, $createdAt: String!, $postImage: String!) {
    createPost(title: $title, content: $content, postedBy: $postedBy, createdAt: $createdAt, postImage: $postImage) {
      id
      title
      content
      postImage
      postedBy {
        id
      }
      createdAt
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
    }
  }
`;

export default {
    DELETE_POST,
    LIKE_POST,
    ADD_POST,
    LOGIN_MUTATION
}