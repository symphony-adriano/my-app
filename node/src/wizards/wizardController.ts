import { Request, Response } from "express"

export const wizardList =
  (_request: Request, response: Response) =>
    response.send([
      {
        name: 'harry'
      }, {
        name: 'ron'
      }
    ])
