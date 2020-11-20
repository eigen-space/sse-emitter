import { FormDataAppender, FormEntry } from '@eigenspace/base-http-client';
import FormData from 'form-data';

export class NodejsFormDataAppender extends FormData implements FormDataAppender {

    append(...args: FormEntry<FormData.AppendOptions | string>): void {
        super.append(...args);
    }
}