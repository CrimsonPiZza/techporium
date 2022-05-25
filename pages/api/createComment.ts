// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity'

type Data = {
  message: string
  err?: any
}

const client = sanityClient

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { _id, name, email, comment } = JSON.parse(req.body)

  try {
    if (!_id)
      return res
        .status(400)
        .json({ message: 'Could not submit comment', err: '_id not found' })

    if (!name || name.replace(/\s/g, '') === '')
      return res
        .status(400)
        .json({
          message: 'Could not submit comment',
          err: 'name format not valid',
        })
    name = name.replace(/\s/g, '')

    if (!email || email.replace(/\s/g, '') === '')
      return res
        .status(400)
        .json({
          message: 'Could not submit comment',
          err: 'email format not valid',
        })
    email = email.replace(/\s/g, '')

    if (!comment || comment.trim() === '')
      return res
        .status(400)
        .json({
          message: 'Could not submit comment',
          err: 'comment format not valid',
        })
    comment = comment.trim()

    await sanityClient.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name: name,
      email: email,
      comment: comment,
    })
    return res
      .status(200)
      .json({
        message: 'Submitted',
        err: { _id: _id, name: name, email: email },
      })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not submit comment', err: err })
  }
}
