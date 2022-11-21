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
  mutation createPost(
    $title: String!
    $content: String!
    $postedBy: String!
    $createdAt: String!
    $postImage: String!
  ) {
    createPost(
      title: $title
      content: $content
      postedBy: $postedBy
      createdAt: $createdAt
      postImage: $postImage
    ) {
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
      allUserInfo {
        id
        username
        email
        profilePicture
        handle
      }
    }
  }
`;


export const SIGNUP_MUTATION = gql`
  mutation register(
    $email: String!
    $password: String!
    $handle: String!
    $username: String!
    $role: String!
  ) {
    register(
      email: $email
      password: $password
      handle: $handle
      username: $username
      role: $role
    ) {
      id
      email
      handle
      username
      password
      role
    }
  }
`;

export const UPDATE_PROFILE = gql`
mutation updateProfile(
  $username: String!
  $email: String!
  $handle: String!
  $profilePicture: String!
  $bio: String!
){
  updateProfile(
    username:$username
    email:$email
    handle:$handle
    profilePicture:$profilePicture
    bio:$bio
  ){
    username
    email
    handle
    profilePicture
    bio
  }
}
`;

export default {
  DELETE_POST,
  LIKE_POST,
  ADD_POST,
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  UPDATE_PROFILE,
};
