import express, { Request, Response } from "express";
import cors from "cors";

export default interface HttpServer {
    registerRoute (method: string, path: string, handler: Function): void;
    listen (port: number): void;
}

export class ExpressAdapter implements HttpServer {
    app: any;

    constructor () {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors())
    }

    registerRoute (method: string, path: string, handler: Function): void {
        this.app[method](path, async (req: Request, res: Response) => {
            try {
                const result = await handler(req, res);
                res.json(result);
            } catch (error: any) {
                console.error(error);
                res.status(422).json({ error: error.message });
            }
        });
    }

    listen (port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}