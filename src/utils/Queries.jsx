import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
 {
    getCurrentUser(token: "${localStorage.getItem("token") || sessionStorage.getItem("token")
  }") {
      id
      handle
      profilePicture
      username
      email
      followers
      following
      bio {
        id
        body
        website
        location
      }
      role
      artist
    }
  }
`;

export const ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      handle
      profilePicture
      username
      email
      followers
      following
      bio {
        id
        body
        website
        location
      }
      role
      artist
    }
  }
`;

export const ALL_POSTS = gql`
  query getAllPosts($limit: Int, $offset: Int) {
    getAllPosts(limit: $limit, offset: $offset) {
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

export const SEARCH_POSTS = gql`
  query searchPosts($search: String!) {
    searchPosts(search: $search) {
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
    }
  }
`;

export const GET_USER_POSTS = gql`
  query getAllPostsByUser($handle: String!) {
    getAllPostsByUser(handle: $handle) {
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


export const MOST_FOLLOWED_USERS = gql`
  query getMostFollowedUsers($limit: Int, $offset: Int) {
    getMostFollowedUsers(limit: $limit, offset: $offset) {
      id
      username
      profilePicture
      handle
      following
      followers
      artist
      bio {
        id
        body
        website
        location
      }
      role
    }
  }
`;

export const MOST_LIKED_POSTS = gql`
query getMostLikedPosts($limit: Int, $offset: Int) {
  getMostLikedPosts(limit: $limit, offset: $offset) {
    id
  	title
    content
    postImage
    postedBy {
      id
      handle
      profilePicture
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
  ALL_USERS,
  GET_CURRENT_USER,
  ALL_POSTS,
  POST_BY_ID,
  SEARCH_POSTS,
  GET_USER_POSTS,
  MOST_FOLLOWED_USERS,
  MOST_LIKED_POSTS,
};