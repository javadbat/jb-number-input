'use client';
import React from 'react';
import { useRef, useImperativeHandle,forwardRef } from 'react';
import 'jb-number-input';
// eslint-disable-next-line no-duplicate-imports
import type {JBNumberInputWebComponent } from 'jb-number-input';
import {type BaseProps, useJBInputAttribute, useJBInputEvents} from 'jb-input/react';
import './module-declaration.js';

// eslint-disable-next-line react/display-name
export const JBNumberInput = forwardRef<JBNumberInputWebComponent | undefined,Props>((props: Props, ref) => {
  const element = useRef<JBNumberInputWebComponent>(null);
  useImperativeHandle(
    ref,
    () => element.current ?? undefined,
    [element],
  );
  // these props passed as ...otherProps to component for shorter code: minValue,maxValue,acceptNegative,decimalPrecision,showControlButton,showThousandSeparator,thousandSeparator,step,showPersianNumber
  const {disabled,required,validationList,value,onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup, children, ...otherProps} = props;
  useJBInputAttribute<JBNumberInputWebComponent>(element,{disabled,required,validationList,value,...otherProps});
  useJBInputEvents<JBNumberInputWebComponent>(element,{onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup,...otherProps});

  return (
    <jb-number-input ref={element} {...otherProps}>
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

