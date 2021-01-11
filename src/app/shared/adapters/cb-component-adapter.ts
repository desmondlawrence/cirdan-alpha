import { CbComponent } from "../models/cb-component.model";
import { IAdapter } from "./i-adapter";

export class CbComponentAdapter implements IAdapter<CbComponent>{
    adapt(item: any): CbComponent {
        return new CbComponent(
            /* tslint:disable:no-string-literal */
            item['value'],
            item['start_date'],
            item['tickers']
            /* tslint:enable:no-string-literal */
        );
    }
}
