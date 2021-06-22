import { ButtonHTMLAttributes } from "react"

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; //Por que que as propriedades do Botão são genéricas?

export function Button(props: ButtonProps) {

    return(
        <button className="button" {...props}></button>
    )
}