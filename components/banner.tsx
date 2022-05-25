import React from 'react'

function Banner() {
  return (
    <div className="flex items-center justify-between bg-yellow-400 border-y border-black py-10 lg:py-0">
      <div className="space-y-5 px-10">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4">
            Techporium
          </span>{' '}
          is a place for Kyle to write and audiences to connect
        </h1>
        <h2>
          It's easy to read and comment on the provided topic
        </h2>
      </div>

      <img
        className="hidden h-32 md:inline-flex lg:h-full p-2"
        src="/Techporium_Logo.png"
        alt=""
      />
    </div>
  )
}

export default Banner
