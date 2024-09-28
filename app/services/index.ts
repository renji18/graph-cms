/* eslint-disable @typescript-eslint/no-explicit-any */

import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT_RENJI18 || ""

const graphQLClient = new GraphQLClient(graphqlAPI)

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `

  const response: any = await graphQLClient.request(query)

  return response.postsConnection.edges
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(where: { featuredPost: true }) {
        featuredImage {
          url
        }
        createdAt
        title
        author {
          name
          photo {
            url
          }
        }
        slug
      }
    }
  `

  const response: any = await graphQLClient.request(query)

  return response.posts
}

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      posts(where: { slug: $slug }) {
        id
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        category {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `

  const response: any = await graphQLClient.request(query, { slug })

  return response.posts[0]
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const response: any = await graphQLClient.request(query)

  return response.posts
}

export const getSimilarPosts = async (slug: string, categories: string[]) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { category_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const response: any = await graphQLClient.request(query, { slug, categories })

  return response.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `

  const response: any = await graphQLClient.request(query)

  return response.categories
}

export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { category_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `

  const response: any = await graphQLClient.request(query, { slug })

  return response.postsConnection.edges
}

export const submitComment = async (obj: {
  comment: string
  name: string
  email: string
  slug: string
}) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })

  return result.json
}

export const getCommments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `

  const response: any = await graphQLClient.request(query, { slug })

  return response.comments
}
