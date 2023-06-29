import { NextApiRequest, NextApiResponse } from 'next'
import Ticket from '../../models/Ticket'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'GET':
            await getAll(req, res);
            break;
        case 'POST':
            await post(req, res);
            break;
        case 'PATCH':
            await patch(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
    }

    const response = await fetch(`${URL}/tickets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status !== 200) {
        res.status(500).json({ data: [] });
    }

    const data = await response.json() as Ticket[];
    res.status(200).json({ data: data });
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    console.log(req.body);

    const response = await fetch(`${URL}/tickets/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
    });

    console.log(response.url)

    if (!response.ok) {
        res.status(500).json({ data: null });
    }

    const data = await response.json() as Ticket;
    res.status(200).json({ data: data });
}

const patch = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
    }

    const response = await fetch(`${URL}/tickets/${req.body.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
    });

    if (!response.ok) {
        res.status(500).json({ data: null });
    }

    const data = await response.json() as Ticket;
    res.status(200).json({ data: data });
}