import { Request, Response } from 'express';
import { Middleware } from '../types/middleware';

export class Pipeline {
    private readonly stack: Middleware[];

    constructor(...middlewares: Middleware[]) {
        this.stack = middlewares;
    }

    async execute(req: Request, res: Response): Promise<void> {
        let prevIndex = -1;

        const runner = async (index: number): Promise<void> => {
            if (index === prevIndex) {
                throw new Error('next() called multiple times');
            }

            prevIndex = index;

            const middleware = this.stack[index];
            if (middleware) {
                await middleware(req, res, () => runner(index + 1));
            }
        };

        await runner(0);
    };
}
