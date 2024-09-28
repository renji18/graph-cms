"use client"

import { getPostDetails } from "@/app/services"
import Author from "@/components/Author"
import Categories from "@/components/Categories"
import Comments from "@/components/Comments"
import CommentsForm from "@/components/CommentsForm"
import PostDetail from "@/components/PostDetail"
import PostWidget from "@/components/PostWidget"
import { Post as PostType } from "@/utility/type"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

const Post = () => {
  const location = usePathname()

  const [postDetails, setPostDetails] = useState<PostType | null>(null)

  useEffect(() => {
    const getPostData = async () => {
      const res = await getPostDetails(location?.split("/")[2])
      setPostDetails(res)
    }
    getPostData()
  }, [])

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={postDetails} />
          <Author author={postDetails?.author} />
          <CommentsForm slug={postDetails?.slug || ""} />
          <Comments slug={postDetails?.slug || ""} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={postDetails?.slug}
              categories={
                Array?.isArray(postDetails?.category)
                  ? postDetails?.category?.map(
                      (cat: { slug: string; name: string }) => cat.slug
                    )
                  : []
              }
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
