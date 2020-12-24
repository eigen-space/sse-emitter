import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import { AnyDictionary } from '@eigenspace/common-types';
import { Logger } from '@eigenspace/logger';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { IdUtils } from '../utils/id/id.utils';
import { Middleware } from '../types/middleware';
import { Pipeline } from '../entities/pipeline';

export class SseEmitter {
    private static ON_DATA_RECEIVED_EVENT = 'ON_DATA_RECEIVED';

    private eventEmitter = new EventEmitter();
    private logger = new Logger({ component: 'SseEmitter' });

    init(...middlewares: Middleware[]): (req: Request, res: Response) => void {
        return (req: Request, res: Response) => {
            this.logger.info('init', 'ready');

            // Otherwise the connection will be closed
            req.socket.setTimeout(0);

            // When a TCP connection is created, it will have Nagle's algorithm enabled.
            // Nagle's algorithm delays data before it is sent via the network.
            // It attempts to optimize throughput at the expense of latency.
            req.socket.setNoDelay(true);

            // Use one HTTP-connection for multiple transactions
            req.socket.setKeepAlive(true);

            res.status(HttpStatusCode.OK);

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');

            // Remove Nginx buffering
            res.setHeader('X-Accel-Buffering', 'no');
            if (req.httpVersion !== '2.0') {
                res.setHeader('Connection', 'keep-alive');
            }

            // Increase number of event listeners on init
            this.eventEmitter.setMaxListeners(Infinity);

            const onDataReceived = (data: AnyDictionary): void => {
                const pipeline = new Pipeline(...middlewares, this.sendData(data));
                pipeline.execute(req, res);
            };

            this.eventEmitter.on(SseEmitter.ON_DATA_RECEIVED_EVENT, onDataReceived);

            req.on('close', () => this.eventEmitter.removeListener('data', onDataReceived));
        };
    }

    send(data: AnyDictionary): void {
        this.logger.info('send', `${JSON.stringify(data)}`);
        this.eventEmitter.emit(SseEmitter.ON_DATA_RECEIVED_EVENT, { data });
    }

    private sendData(data: AnyDictionary): Middleware {
        return (_: Request, res: Response, next: () => void) => {
            this.logger.info('send', 'sending data...');
            const id = IdUtils.generateNumber();

            // Read more about SEE message structure
            // https://medium.com/conectric-networks/a-look-at-server-sent-events-54a77f8d6ff7
            res.write(`id: ${id}\n`);
            // \n\n - is necessary part to any SSE messages
            res.write(`data: ${JSON.stringify(data.data)}\n\n`);

            next();
        };
    }
}
