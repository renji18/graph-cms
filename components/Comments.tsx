import { getCommments } from "@/app/services"
import { Comments as CommentType } from "@/utility/type"
import moment from "moment"
import React, { useEffect, useState } from "react"
import parse from "html-react-parser"

const Comments = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<Array<CommentType> | null>(null)

  useEffect(() => {
    if (slug === "") return
    getCommments(slug).then((result) => setComments(result))
  }, [slug])

  return (
    <>
      {comments && comments?.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments
            .slice()
            .reverse()
            .map((c) => (
              <div
                key={c.createdAt}
                className="border-b border-gray-100 mb-4 pb-4"
              >
                <p className="mb-4">
                  <span className="font-semibold">{c.name}</span> on{" "}
                  {moment(c.createdAt).format("MMM DD, YYYY")}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">
                  {parse(c.comment)}
                </p>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default Comments
