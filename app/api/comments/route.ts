import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT_RENJI18 || ""
const graphqlToken = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT_RENJI18_PAT || ""

export async function POST(req: Request) {
  const { comment, name, email, slug } = await req.json()

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlToken}`,
    },
  })

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `

  try {
    const result = graphQLClient.request(query, {
      comment,
      name,
      email,
      slug,
    })
    return new Response(
      JSON.stringify({ message: "Success" }),
      { status: 200 }
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
    })
  }
}
