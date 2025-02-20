import { EventTypeWithTarget } from "jb-core";
import { JBNumberInputWebComponent } from "./jb-number-input";

export type NumberFieldParameter = {
    decimalPrecision:number | null;
    acceptNegative:boolean;
    maxValue:number | null;
    minValue:number | null;
}
export type TypeParameter = {
    useThousandSeparator:boolean,
    invalidNumberReplacement:string,
    thousandSeparator:string,
    showPersianNumber:boolean,
}
export type NumberFieldParameterInput = Partial<NumberFieldParameter>;
export type NumberInputElements = {
    controlButtons:HTMLDivElement | null;
}
export type JBNumberInputEventType<TEvent> = EventTypeWithTarget<TEvent,JBNumberInputWebComponent>
