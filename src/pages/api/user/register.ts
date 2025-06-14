import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "../../../lib/firebase/services";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        await signUp(req.body, (success) => {
            if (success) {
                res.status(200).json({ success: true, message: "Success" });
            } else {
                res.status(400).json({ success: false, message: "Failed" });
            }
        });
    } else {
        res.status(405).json({ success: true, message: "Method not allowed" });
    }
};

export default handler