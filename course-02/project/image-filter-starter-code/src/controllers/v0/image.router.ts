import { Router, Request, Response } from 'express'
import { filterImageFromURL, deleteLocalFiles } from '../../util/util'
import { resolve } from 'path'

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  let filteredpath = ''
  const { image_url } = req.query

  if (!image_url) {
    return res.status(400).send('Image url is required')
  }

  try {
    filteredpath = await filterImageFromURL(image_url)
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    })
    console.error('Error while processing the image ', error)
  }

  deleteLocalFiles([resolve(filteredpath)])
  res.sendFile(filteredpath)
  res.send(image_url)
})

export const ImageRouter: Router = router
