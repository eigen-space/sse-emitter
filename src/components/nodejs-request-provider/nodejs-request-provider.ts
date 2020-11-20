import { RequestProviderResponse } from '@eigenspace/base-http-client';
import { RequestProvider, RequestProviderOptions } from '@eigenspace/base-http-client/types/request-provider';
import fetch, { Response } from 'node-fetch';
import { NodejsProviderResponse } from '../nodejs-provider-response/nodejs-provider-response';
import { HttpError } from '../../entities/http-error/http-error';

export class NodejsRequestProvider implements RequestProvider<Response> {

    async fetch<T>(url: string, options: RequestProviderOptions): Promise<RequestProviderResponse<Response, T>> {
        // TODO: fix body type later
        // @ts-ignore
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new HttpError(response.status, response.statusText);
        }

        return new NodejsProviderResponse(response);
    }
}