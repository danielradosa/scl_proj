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
        artist
        role
        followers
        following 
        bio {
          id
          body
          website
          location
        }
        posts {
          id
          title
          content
          postImage
        }
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

export const UPDATE_USERNAME = gql`
  mutation updateUsername($id: ID!, $username: String!, $token: String!) {
    updateUsername(id: $id, username: $username, token: $token) {
      id
      username
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation updateEmail($id: ID!, $email: String!, $token: String!) {
    updateEmail(id: $id, email: $email, token: $token) {
      id
      email
    }
  }
`;

export const CREATE_UPDATE_BIO = gql`
  mutation createOrUpdateBio(
    $bioBy: String!
    $body: String!
    $website: String!
    $location: String!
  ) {
    createOrUpdateBio(
      bioBy: $bioBy
      body: $body
      website: $website
      location: $location
    ) {
      id
      bioBy
      body
      website
      location
    }
  }
`;

export const CREATE_UPDATE_PROFILE_PICTURE = gql`
  mutation uploadProfilePicture($profilePicture: String!, $id: ID!) {
    uploadProfilePicture(profilePicture: $profilePicture, id: $id) {
      id
      profilePicture
    }
  }
`;

export const TOGGLE_ARTIST = gql`
  mutation toggleArtist($id: ID!) {
    toggleArtist(id: $id) {
      id
      artist
    }
  }
`;

export default {
  DELETE_POST,
  LIKE_POST,
  ADD_POST,
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  CREATE_UPDATE_BIO,
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  CREATE_UPDATE_PROFILE_PICTURE,
  TOGGLE_ARTIST,
};
