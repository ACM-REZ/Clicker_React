import { useState, useEffect } from "react"
export function Timer() {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const timeParser = (value) => String(value).padStart(2, 0)
       
    useEffect(() => {
        var time = setInterval(() => {
            setSeconds(seconds + 1);
            if(seconds === 59) {
                setMinutes(minutes + 1);
                setSeconds(0);
            }
        },1000)
        return () => clearInterval(time)
    })


    return(
        <div className='font-semibold text-2xl'>{ timeParser(minutes)}:{timeParser(seconds)}</div>
    )
}