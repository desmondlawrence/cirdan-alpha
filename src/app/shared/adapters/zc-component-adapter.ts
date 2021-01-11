import { CbComponent } from "../models/cb-component.model";
import { ZcComponent } from "../models/zc-component.model";
import { IAdapter } from "./i-adapter";

export class ZcComponentAdapter implements IAdapter<ZcComponent>{
    adapt(item: any): ZcComponent {
        return new ZcComponent(
            /* tslint:disable:no-string-literal */
            item['value'],
            item['start_date'],
            item['quantity']
            /* tslint:enable:no-string-literal */
        );
    }
}
