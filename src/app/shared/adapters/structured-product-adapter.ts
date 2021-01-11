import { Injectable } from "@angular/core";
import { ProductComponentType } from "../enums/product-component-type.enum";
import { StructuredProduct } from "../models/structured-product.model";
import { CbComponentAdapter } from "./cb-component-adapter";
import { IAdapter } from "./i-adapter";
import { ZcComponentAdapter } from "./zc-component-adapter";

@Injectable({
    providedIn: "root",
})

export class StructuredProductAdapter implements IAdapter<StructuredProduct>{
    adapt(item: any): StructuredProduct {
        const cbComponentAdapter = new CbComponentAdapter();
        const zcComponentAdapter = new ZcComponentAdapter();
        return new StructuredProduct(
            /* tslint:disable:no-string-literal */
            item['isin'],
            item['issue_date'],
            item['tags'],
            item['components'].map((componentItem: any) => {
                switch (componentItem['type']) {
                    case ProductComponentType.CB: return cbComponentAdapter.adapt(componentItem);
                    case ProductComponentType.ZC: return zcComponentAdapter.adapt(componentItem);
                    default: return;
                }
            })
            /* tslint:enable:no-string-literal */
        );
    }
}
