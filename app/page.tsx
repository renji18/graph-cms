import Categories from "@/components/Categories"
import FeaturedPosts from "@/components/FeaturedPosts"
import PostWidget from "@/components/PostWidget"
import Posts from "@/components/Posts"

export default function Home() {
  return (
    <>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <Posts />
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </>
  )
}
