export interface Post {
  author: { bio: string; name: string; id: string; photo: { url: string } }
  createdAt: string
  slug: string
  title: string
  excerpt: string
  featuredImage: { url: string }
  category:
    | { name: string; slug: string }
    | Array<{ name: string; slug: string }>
  content?: {
    raw: {
      children: Array<{
        type: string
        children: Array<{
          text: string
          type?: string | undefined
          bold?: boolean | undefined
          italic?: boolean | undefined
          underline?: boolean | undefined
          title?: string | undefined
          height?: string | undefined
          width?: string | undefined
          src?: string | undefined
        }>
      }>
    }
  }
  id?: string
}

export interface PostOverview {
  featuredImage: { url: string }
  createdAt: string
  slug: string
  title: string
  author?: {
    name: string
    photo: {
      url: string
    }
  }
}

export interface Category {
  name: string
  slug: string
}

export interface Comments {
  name: string
  createdAt: string
  comment: string
}
