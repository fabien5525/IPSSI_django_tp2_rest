import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
        res.status(500).end("Error getting tickets");
        return;
    }

    console.log(req.headers?.authorization ?? "")

    const response = await fetch(`${URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers?.authorization ?? "",
        },
    });

    if (response.status === 403) {
        res.status(403).end("Error");
        return;
    }

    if (!response.ok) {
        res.status(500).end("Error");
        return;
    }

    const data = await response.json() as User[];

    res.status(200).json({ data: data });
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
        res.status(500).end("Error creating ticket");
        return;
    }

    const response = await fetch(`${URL}/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers?.authorization ?? "",
        },
        body: JSON.stringify(req.body),
    });



    if (!response.ok) {
        res.status(500).end("Error");
        return;
    }

    const data = await response.json() as User;
    res.status(200).json({ data: data });
}

const patch = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
        res.status(500).end("Error creating ticket");
        return;
    }

    const response = await fetch(`${URL}/users/${req.query.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers?.authorization ?? "",
        },
        body: JSON.stringify(req.body),
    });

    if (!response.ok) {
        res.status(500).end("Error");
        return;
    }

    const data = await response.json() as User;
    res.status(200).json({ data: data });
}

const remove = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
        res.status(500).end("Error creating ticket");
        return;
    }

    const response = await fetch(`${URL}/users/${req.query.id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers?.authorization ?? "",
        },
    });

    if (!response.ok) {
        res.status(500).end("Error");
        return;
    }

    res.status(200).end("Error");
}

export { getAll, post, patch, remove };