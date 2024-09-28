export interface Post {
  author: { bio: string; name: string; id: string; photo: { url: string } }
  createdAt: string
  slug: string
  title: string
  excerpt: string
  featuredImage: { url: string }
  category: any
  content?: {
    raw: {
      children: Array<any>
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
