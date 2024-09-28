/* eslint-disable @next/next/no-img-element */
"use client"

import { getRecentPosts, getSimilarPosts } from "@/app/services"
import { PostOverview } from "@/utility/type"
import moment from "moment"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const PostWidget = ({
  categories,
  slug,
}: {
  categories?: string[]
  slug?: string
}) => {
  const [relatedPosts, setRelatedPosts] = useState<Array<PostOverview> | null>(
    []
  )

  useEffect(() => {
    if (slug) {
      getSimilarPosts(slug, categories || []).then((result) =>
        setRelatedPosts(result)
      )
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
  }, [slug])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts?.map((post: PostOverview) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-1/6 flex-none">
            <img
              alt={post.title}
              className="align-middle rounded-full"
              src={post.featuredImage.url}
              height="60px"
              width="60px"
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title}></Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
