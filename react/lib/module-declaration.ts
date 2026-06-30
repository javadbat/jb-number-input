import type { JBNumberInputWebComponent } from 'jb-number-input';

declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'jb-number-input': JBNumberInputType;
        }
        interface JBNumberInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBNumberInputWebComponent>, JBNumberInputWebComponent> {
            class?: string,
            label?: string,
            name?: string,
            message?: string,
            placeholder?:string,
        }
    }
}
