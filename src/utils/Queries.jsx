import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
 {
    getCurrentUser(token: "${
      localStorage.getItem("token") || sessionStorage.getItem("token")
    }") {
      id
      handle
      profilePicture
      username
      email
      followers
      following
    }
  }
`;

export const ALL_POSTS = gql`
  {
    getAllPosts {
      id
      title
      content
      postImage
      postedBy {
        id
        username
        profilePicture
        handle
      }
      createdAt
      likedBy {
        id
        handle
      }
    }
  }
`;

export const POST_BY_ID = gql`
  query getPostById($id: ID!) {
    getPostById(id: $id) {
      id
      title
      content
      postImage
      postedBy {
        id
        username
        profilePicture
        handle
      }
      createdAt
      likedBy {
        id
        handle
      }
    }
  }
`;

export default {
  GET_CURRENT_USER,
  ALL_POSTS,
  POST_BY_ID,
};