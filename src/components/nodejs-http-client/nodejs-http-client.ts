import { NodejsRequestProvider } from '../nodejs-request-provider/nodejs-request-provider';
import { NodejsFormDataAppender } from '../nodejs-form-data-appender/nodejs-form-data-appender';
import { Response } from 'node-fetch';
import { BaseHttpClient, CommonQueryProps, QueryProvider } from '@eigenspace/base-http-client';

export class NodejsHttpClient implements QueryProvider {
    private baseHttpClient: BaseHttpClient<Response>;

    constructor(baseUrl = '') {
        const requestProvider = new NodejsRequestProvider();
        this.baseHttpClient = new BaseHttpClient(requestProvider, undefined, NodejsFormDataAppender, baseUrl);
    }

    delete<T>(url: string, props?: CommonQueryProps): Promise<T> {
        return this.baseHttpClient.delete<T>(url, props);
    }

    get<T>(url: string, props?: CommonQueryProps): Promise<T> {
        return this.baseHttpClient.get<T>(url, props);
    }

    patch<T>(url: string, props?: CommonQueryProps): Promise<T> {
        return this.baseHttpClient.patch<T>(url, props);
    }

    post<T>(url: string, props?: CommonQueryProps): Promise<T> {
        return this.baseHttpClient.post<T>(url, props);
    }

    put<T>(url: string, props?: CommonQueryProps): Promise<T> {
        return this.baseHttpClient.put<T>(url, props);
    }
}