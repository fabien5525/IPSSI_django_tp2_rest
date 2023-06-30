import { NextApiRequest, NextApiResponse } from "next";
import Credentials from "../../models/Credentials";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'POST':
            await post(req, res);
            break
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
        res.status(500).end("Error logging in");
        return;
    }

    const response = await fetch(`${URL}/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
    });

    console.log(response);
    console.log(req.body);

    if (!response.ok) {
        res.status(500).end("Error");
        return;
    }

    const data = await response.json() as Credentials;
    res.status(200).json({ data: data });
}