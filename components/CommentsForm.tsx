import { submitComment } from "@/app/services"
import React, { useEffect, useRef, useState } from "react"

const CommentsForm = ({ slug }: { slug: string }) => {
  const commentEl = useRef<HTMLTextAreaElement | null>(null)
  const nameEl = useRef<HTMLInputElement | null>(null)
  const emailEl = useRef<HTMLInputElement | null>(null)
  const storeDataEl = useRef<HTMLInputElement | null>(null)

  const [error, setError] = useState<boolean>(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

  const handleCommentSubmit = () => {
    setError(false)

    const name = nameEl.current?.value
    const comment = commentEl.current?.value
    const email = emailEl.current?.value

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = {
      comment,
      name,
      email,
      slug,
    }

    if (storeDataEl.current?.checked) {
      window.localStorage.setItem("name", name)
      window.localStorage.setItem("email", email)
    } else {
      window.localStorage.removeItem("name")
      window.localStorage.removeItem("email")
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }

  useEffect(() => {
    if (nameEl.current)
      nameEl.current.value = window.localStorage.getItem("name") || ""

    if (emailEl.current)
      emailEl.current.value = window.localStorage.getItem("email") || ""
  }, [])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          type="text"
          ref={emailEl}
          placeholder="Email"
          name="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          className="hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer transition duration-500 ease-linear"
          type="button"
          onClick={handleCommentSubmit}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment Submitted for review.
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
