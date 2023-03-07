import { ErrorMessage } from "../components/ErrorMessage"
import { useState, useEffect } from "react"

export function Buster(props) {
    const [error, setError] = useState('');

    useEffect(() => {
        if(!props.visible)
            setError('');
    }, [props.visible])

    return(
        <div className="w-[350px] bg-slate-400 rounded-md text-lg text-center mr-3 ml-3">
            <div className="font-semibold text-white">{props.nameHeader}</div>
                <button 
                    className="bg-slate-200 rounded-lg px-2 py-2 my-2 hover:bg-white"
                    onClick={() => { 
                        if(props.count >= props.cost) {
                            props.onClick();
                            setError('')
                        } else {
                            setError('Недостаточно средств');
                        }
                    }}
                >Купить за {props.cost}P</button>
                {error && <ErrorMessage error={error}></ErrorMessage>}
        </div>
    )
}

