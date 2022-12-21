import {NextApiRequest, NextApiResponse} from 'next'
export default async (req, res) => {
    res.status(200).json({message: 'hello world'})
}