export type NumberFieldParameter = {
    step:number;
    decimalPrecision:number | null;
    acceptNegative:boolean;
    maxValue:number | null;
    useThousandSeparator:boolean;
    minValue:number | null;
    thousandSeparator:string;
    showPersianNumber:boolean;
    invalidNumberReplacement:string;
}
export type NumberFieldParameterInput = Partial<NumberFieldParameter>;
export type NumberInputElements = {
    controlButtons:HTMLDivElement | null;
}