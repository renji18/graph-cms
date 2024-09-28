"use client"

import { getCategories } from "@/app/services"
import { Category } from "@/utility/type"
import Link from "next/link"
import { useEffect, useState } from "react"

const Header = () => {
  const [categories, setCategories] = useState<Array<Category>>([])

  useEffect(() => {
    getCategories().then((newCats) => setCategories(newCats))
  }, [])

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href={"/"}>
            <span className="cursor-pointer font-bold text-4xl text-white">
              Graph CMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((c: Category) => (
            <Link key={c.slug} href={`/category/${c.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
