import React, {useState} from 'react'
import { ErrorMessage } from './ErrorMessage';

export const Casino = (props) => {

    const [bet, setBet] = useState('');
    const [error, setError] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        setError('');

        if (isNaN(bet) || bet > props.count) {
            setError('Пожалуйста введите правильное значение');
            return
        }

        let rnd = () => Math.random() * 1 + 0;
        rnd() > props.chance ? props.setCount(props.count - Number(bet.split(' ').join(''))) : props.setCount(props.count + Number(bet.split(' ').join('')));
        
        setBet('');
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mb-3">Casino</h1>
            <form >
                <input  
                    type='text' 
                    placeholder="Введите сумму" 
                    className="border py-2 px-4 mb-2 outline-none w-[320px]"
                    value={bet}
                    onChange={e => {
                        setBet(e.target.value);
                        setError('');
                    }}
                    ></input>
            </form>
            {error && <ErrorMessage error={error} />}
            <button 
                className="bg-slate-400 rounded-lg px-2 py-2 my-2 hover:bg-slate-500 text-white block mx-auto"
                onClick={submitHandler}
            >Сделать ставку</button>
            <div className='flex justify-between font-semibold'>
                <div>Ваш баланс: {props.price_format(props.count)}P</div>
                <div>Шанс: {Math.ceil(props.chance * 100)}%</div>
            </div>
        </div>
    )
}