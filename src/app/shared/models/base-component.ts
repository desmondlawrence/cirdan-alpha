import { ProductComponentType } from "../enums/product-component-type.enum";
import { Utils } from "../utils";

export abstract class BaseComponent {
    type: ProductComponentType;
    value: number;
    startDate: Date;
    constructor(
        type: ProductComponentType,
        value: number,
        startDateString: string
    ) {
        this.type = type;
        this.value = value;
        this.startDate = Utils.convertYYYYMMDDToDate(startDateString);
    }


}
