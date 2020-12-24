import { Request, Response } from 'express';

type Next = () => Promise<void> | void;
export type Middleware = (req: Request, res: Response, next: Next) => void;
