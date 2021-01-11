import { Utils } from "../utils";
import { BaseComponent } from "./base-component";


export class StructuredProduct {
    isin: string;
    issueDate: Date;
    tags: string[];
    components: BaseComponent[];

    constructor(
        isin: string,
        issueDateString: string,
        tags: string[] = [],
        components: BaseComponent[] = []
    ) {
        this.isin = isin;
        this.issueDate = Utils.convertYYYYMMDDToDate(issueDateString);
        this.tags = tags;
        this.components = components;
    }
}
