import type { NextApiRequest, NextApiResponse } from 'next'
import State from '../../models/State'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'GET':
            await getAll(req, res);
            break
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.log("No URL", URL);
        res.status(500).json({ data: [] });
        return;
    }

    try {
        const response = await fetch(`${URL}/states/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": req.headers?.authorization ?? "",
            },
        });

        console.log("Response status:", response.status);

        if (response.status !== 200) {
            console.log("Request failed with status:", response.status);
            res.status(500).json({ data: [] });
        }

        const data = await response.json() as State[];
        res.status(200).json({ data: data });
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ data: [] });
    }
}