import React from "react"

const Author = ({
  author,
}: {
  author:
    | {
        bio: string
        name: string
        id: string
        photo: { url: string }
      }
    | undefined
}) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute flex justify-center left-0 right-0 -top-14">
        <img
          src={author?.photo?.url}
          alt={author?.name}
          width="100px"
          className="align-middle rounded-full"
        />
      </div>
      <h3 className="text-white mt-10 mb-3 text-xl font-bold">
        {author?.name}
      </h3>
      <p className="text-white text-lg">{author?.bio}</p>
    </div>
  )
}

export default Author
