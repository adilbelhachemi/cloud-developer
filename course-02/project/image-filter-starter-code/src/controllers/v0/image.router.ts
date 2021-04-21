import { Router, Request, Response } from 'express'
import { filterImageFromURL, deleteLocalFiles } from '../../util/util'

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  const { image_url } = req.query
  let filteredpath = ''

  if (!image_url) {
    return res.status(400).send('Image url is required')
  }

  try {
    filteredpath = await filterImageFromURL(image_url)
    res.sendFile(filteredpath)
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    })
    console.error('Error while processing the image ', error)
  }

  res.on('finish', async () => deleteLocalFiles([filteredpath]))
})

export const ImageRouter: Router = router
