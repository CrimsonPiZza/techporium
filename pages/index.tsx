import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Banner from '../components/banner'
import Header from '../components/header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Banner />

      {/* POSTS */}
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={
                  post.mainImage
                    ? urlFor(post.mainImage).url()!
                    : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F247954%2Fscreenshots%2F2478890%2Fempty_state.jpg&f=1&nofb=1'
                }
                alt=""
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    <span className="font-thin italic">{post.description}</span>{' '}
                    ~ <span className="font-bold">{post.author.name}</span>
                  </p>
                </div>

                <img
                  className="h-12 w-12 rounded-full"
                  src={
                    post.author.image
                      ? urlFor(post.author.image).url()!
                      : 'https://i.ibb.co/K69hrSx/user.png'
                  }
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  // RUN EVERY REQUEST
  const query = `*[_type == "post"]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    description,
    slug,
    mainImage,
    author -> {
     name,
     image
    },
  }`

  const posts = await sanityClient.fetch(query)

  // PASS BACK PROPS
  return {
    props: {
      posts,
    },
  }
}
