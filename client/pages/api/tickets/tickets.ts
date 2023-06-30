import { NextApiRequest, NextApiResponse } from "next";
import Ticket from "../../../models/Ticket";

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
        res.status(500).end("Error getting tickets");
        return;
    }

    console.log(req.headers?.authorization ?? "")

    const response = await fetch(`${URL}/tickets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers?.authorization ?? "",
        },
    });

    if (response.status !== 200) {
        res.status(500).json({ data: [] });
        return;
    }

    const data = await response.json() as Ticket[];
    res.status(200).json({ data: data });
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

    if (!URL) {
        console.error("No URL found", URL);
        res.status(500).end("Error creating ticket");
        return;
    }

    const response = await fetch(`${URL}/tickets/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers?.authorization ?? "",
        },
        body: JSON.stringify(req.body),
    });

    console.log(response.url)

    if (!response.ok) {
        res.status(500).json({ data: null });
        return;
    }

    const data = await response.json() as Ticket;
    res.status(200).json({ data: data });
}

const patch = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;
    const id = req.query.id;

    if (!URL || !id) {
        console.error("No URL found | No ID found", URL, id);
        res.status(500).end(`Error updating ticket with id ${id}`);
        return;
    }

    const response = await fetch(`${URL}/tickets/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers?.authorization ?? "",
        },
        body: JSON.stringify(req.body),
    });

    if (!response.ok) {
        res.status(500).json({ data: null });
        return;
    }

    const data = await response.json() as Ticket;
    res.status(200).json({ data: data });
}

const remove = async (req: NextApiRequest, res: NextApiResponse) => {
    const URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;
    const id = req.query.id;

    console.log(req.body, URL)

    if (!URL || !id) {
        console.error("No URL found | No ID found", URL, id);
        res.status(500).end(`Error deleting ticket with id ${id}`);
        return;
    }

    const response = await fetch(`${URL}/tickets/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": req.headers?.authorization ?? "",
        },
    });

    console.log(response)

    if (!response.ok) {
        res.status(500).end(`Error deleting ticket with id ${id}`);
        return;
    }


    res.status(200).end();
}

export { getAll, post, patch, remove };