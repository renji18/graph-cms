"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Categories from "@/components/Categories"
import PostCard from "@/components/PostCard"
import { Post } from "@/utility/type"
import { getCategoryPost } from "@/app/services"

const CategoryPost = () => {
  const location = usePathname()
  const [posts, setPosts] = useState<Array<{ node: Post }> | null>(null)

  useEffect(() => {
    const getPostData = async () => {
      const res = await getCategoryPost(location?.split("/")[2])
      setPosts(res)
    }
    getPostData()
  }, [])

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts?.map((post) => (
            <PostCard key={post.node.title} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CategoryPost
