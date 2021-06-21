import { useState } from "react"

export function Button() {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
        console.log(counter);
    }

    return(
        <button onClick={increment}>{counter}</button>
    )
}