import React from 'react'

function Banner() {
  return (
    <div className="flex items-center justify-between bg-yellow-400 border-y border-black py-10 lg:py-0">
      <div className="space-y-5 px-10">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4">
            Medium
          </span>{' '}
          is a place to write read and connect
        </h1>
        <h2>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers
        </h2>
      </div>

      <img
        className="hidden h-32 md:inline-flex lg:h-full"
        src="https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Medium-512.png"
        alt=""
      />
    </div>
  )
}

export default Banner
