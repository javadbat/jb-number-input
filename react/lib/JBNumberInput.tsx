import React ,{ useRef, useEffect, useImperativeHandle, useState, type DetailedHTMLProps, type HTMLAttributes,forwardRef } from 'react';
import 'jb-number-input';
// eslint-disable-next-line no-duplicate-imports
import {type JBNumberInputWebComponent } from 'jb-number-input';
import {BaseProps, useJBInputAttribute, useJBInputEvents} from 'jb-input/react';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'jb-number-input': JBNumberInputType;
        }
        interface JBNumberInputType extends DetailedHTMLProps<HTMLAttributes<JBNumberInputWebComponent>, JBNumberInputWebComponent> {
            class?: string,
            label?: string,
            name?: string,
            message?: string,
            placeholder?:string,
        }
    }
}
// eslint-disable-next-line react/display-name
export const JBNumberInput = forwardRef((props: Props, ref) => {
  const element = useRef<JBNumberInputWebComponent>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  //to force rerender for events
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);
  useJBInputAttribute(element,props);
  useJBInputEvents<JBNumberInputWebComponent>(element,props);
  useEffect(() => {
    if(element?.current){
      element.current.minValue = props.minValue;
    }
  }, [props.minValue]);
  useEffect(() => {
    if(element.current){
      element.current.maxValue = props.maxValue;
    }
  }, [props.maxValue]);
  useEffect(() => {
    if(element.current && props.acceptNegative !== undefined){
      element.current.acceptNegative = props.acceptNegative;
    }
  }, [props.acceptNegative]);
  useEffect(() => {
    if(element.current){
      element.current.decimalPrecision = props.decimalPrecision;
    }
  }, [props.decimalPrecision]);
  useEffect(() => {
    if (element.current && typeof props.showControlButton == "boolean") {
      element.current.showControlButton = props.showControlButton;
    }
  }, [props.showControlButton]);
  useEffect(() => {
    if (element.current && typeof props.showThousandSeparator == "boolean") {
      element.current.showThousandSeparator = props.showThousandSeparator;
    }
  }, [props.showThousandSeparator]);
  useEffect(() => {
    if (element.current && typeof props.thousandSeparator == "string") {
      element.current.thousandSeparator = props.thousandSeparator;
    }
  },[props.thousandSeparator]);
  useEffect(() => {
    if (element.current && typeof props.step == "number") {
      element.current.step = props.step;
    }
  }, [props.step]);
  useEffect(() => {
    if (element.current && typeof props.showPersianNumber == "boolean") {
      element.current.showPersianNumber = props.showPersianNumber;
    }
  }, [props.showPersianNumber]);
  return (
    <jb-number-input ref={element} class={props.className}>
      {props.children}
    </jb-number-input>
  );
});
export type Props = BaseProps<JBNumberInputWebComponent> & {
    minValue?:number,
    maxValue?:number,
    acceptNegative?:boolean,
    decimalPrecision?:number,
    showThousandSeparator?:boolean,
    thousandSeparator?:string,
    step?:number,
    showPersianNumber?:boolean,
    showControlButton?:boolean
}
JBNumberInput.displayName = "JBNumberInput";

