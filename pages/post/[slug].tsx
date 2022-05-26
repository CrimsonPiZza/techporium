import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import Header from '../../components/header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import Script from 'next/script'

interface Props {
  post: Post
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        setSubmitted(true)
      })
      .catch((err) => {
        setSubmitted(false)
      })
  }

  const currentURL = () =>
    `https://techporium.vercel.app/post/` + post.slug.current

  return (
    <main>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={currentURL()} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={urlFor(post.mainImage).url()!} />
      </Head>
      <Header />

      <img
        className="h-60 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mb-3 text-3xl">{post.title}</h1>
        <h2 className="text-l mb-2 font-light text-gray-500">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2 p-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="text-sm font-extralight">
            Blog post by <span className="font-bold">{post.author.name}</span> |
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <PortableText
            className="post__content mt-10"
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props} />
              ),
              h3: (props: any) => (
                <h1 className="text-l my-5 font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          ></PortableText>
        </div>
      </article>

      <div className="mx-auto max-w-3xl p-5 text-center">
        {/* Your share button code */}
        <div
          className="fb-share-button"
          data-href={currentURL()}
          data-layout="button_count"
        ></div>
      </div>

      <hr className="my-5 mx-auto max-w-lg border-yellow-500" />

      {submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
          <h1 className="text-3xl font-bold">
            Thank you for submitting the comment!
          </h1>
          <p>Once it has been approve, your comment will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="mt-2 py-2" />

          {/* POST ID */}
          <input
            type="hidden"
            {...register('_id')}
            name="_id"
            value={post._id}
          />

          <label className="mb-5 block">
            <span className="text-gray-700">Name</span>
            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border px-3 py-2 shadow outline-none ring-yellow-500 focus:ring"
              placeholder="Kyle Hemsworth"
              type="text"
            />
          </label>
          <label className="mb-5 block">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email', { required: true })}
              className="form-input mt-1 block w-full rounded border px-3 py-2 shadow outline-none ring-yellow-500 focus:ring"
              placeholder="kylehemswoth@gmail.com"
              type="email"
            />
          </label>
          <label className="mb-5 block">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className="form-textarea mt-1 block w-full rounded border px-3 py-2 shadow outline-none ring-yellow-500 focus:ring"
              placeholder="Your Comment"
              cols={30}
              rows={10}
            ></textarea>
          </label>

          {/* ERROR WILL RETURN ON FAILED VALIDATIONS */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">The Name Field Is Required</span>
            )}
            {errors.email && (
              <span className="text-red-500">The Email Field Is Required</span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                The Comment Field Is Required
              </span>
            )}
          </div>

          <input
            type="submit"
            className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
          />
        </form>
      )}

      {/* COMMENTS */}

      <div className="my-10 mx-auto flex max-w-2xl flex-col p-10">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div
            key={comment._id}
            className="my-5 flex flex-col justify-start rounded-md p-4 shadow shadow-yellow-500"
          >
            <p>
              <span className="font-semibold text-yellow-500">
                {comment.name}
              </span>
              <span className="text-sm font-extralight">
                {' '}
                | {new Date(comment._createdAt).toLocaleString()}
              </span>
            </p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>

      {/* Load Facebook SDK for JavaScript */}
      <div id="fb-root"></div>
      <Script strategy="afterInteractive">
        {`
          (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
          fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>
    </main>
  )
}

export default Post

// Tell NEXT.JS which path to pre-render
export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
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
    body,
    'comments': *[
      _type == 'comment' &&
      post._ref == ^._id &&
      approved == true
    ]
  }`

  const post = await sanityClient.fetch(query, { slug: params?.slug })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // AFTER 60sec, WILL UPDATE THE CACHE
  }
}
