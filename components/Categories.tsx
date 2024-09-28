'use client'

import { getCategories } from "@/app/services"
import { Category } from "@/utility/type"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const Categories = () => {
  const [categories, setCategories] = useState<Array<Category>>([])

  useEffect(() => {
    getCategories().then((newCats) => setCategories(newCats))
  }, [])
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((cat: Category) => (
        <Link key={cat.slug} href={`/category/${cat.slug}`}>
          <span className="block cursor-pointer pb-3 mb-3">{cat.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default Categories
