import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-32 md:w-44 cursor-pointer object-contain"
            src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
            alt=""
          />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex ">
          <h3><a href="/about">About</a></h3>
          <h3><a href="/contact">Contact</a></h3>
          <h3 className="rounded-full bg-green-600 px-4 py-1 text-white">
            <a href="/follow">Follow</a>
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-green-600">
        <h3><a href="/signin">Sign In</a></h3>
        <h3 className="rounded-full border border-green-600 px-4 py-1">
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
