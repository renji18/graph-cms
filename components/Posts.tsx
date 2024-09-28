"use client"

import { getPosts } from "@/app/services"
import { Post } from "@/utility/type"
import React, { useEffect, useState } from "react"
import PostCard from "./PostCard"

const Posts = () => {
  const [posts, setPosts] = useState<Array<{ node: Post }> | null>(null)

  useEffect(() => {
    const getPostData = async () => {
      const res = await getPosts()
      setPosts(res)
    }
    getPostData()
  }, [])

  return (
    <>
      {posts?.map((post: { node: Post }) => (
        <PostCard post={post?.node} key={post?.node.title} />
      ))}
    </>
  )
}

export default Posts
