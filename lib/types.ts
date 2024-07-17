export type NumberFieldParameter = {
    step:number;
    decimalPrecision:number | null;
    invalidNumberReplacement:string;
    useThousandSeparator:boolean;
    thousandSeparator:string;
    acceptNegative:boolean;
    maxValue:number | null;
    minValue:number | null;
    showButtons:boolean;
    showPersianNumber:boolean;
}
export type NumberFieldParameterInput = Partial<NumberFieldParameter>;