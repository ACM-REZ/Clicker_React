
export function Counter(props) {
    return(
        <div className="flex flex-col justify-center mt-2 items-center">
            <div className="text-4xl font-semibold mb-3">{props.price_format(props.count)}₽</div>
            <button
                onMouseEnter={() => props.onMouseEnter()}
                onMouseLeave={() => props.onMouseLeave()}
                onClick={() => props.onClick()}
                className="bg-slate-400 rounded-full px-3 py-3 text-white hover:bg-slate-500"
            >Наведись на меня!!!</button>
        </div>
    )
}