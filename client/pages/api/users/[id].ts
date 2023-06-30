import { NextApiRequest, NextApiResponse } from "next";
import { patch, remove } from "./users";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'PATCH':
            await patch(req, res);
            break;
        case 'DELETE':
            await remove(req, res);
            break;
        default:
            res.setHeader('Allow', ['PATCH', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}