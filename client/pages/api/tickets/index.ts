import { NextApiRequest, NextApiResponse } from 'next'
import { getAll, post, patch, remove } from './tickets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await getAll(req, res);
            break;
        case 'POST':
            await post(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

