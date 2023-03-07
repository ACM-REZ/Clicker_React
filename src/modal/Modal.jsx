export const Modal = ({visible, setVisible, children}) => {
    let rootClasses = 'fixed top-0 right-0 left-0 bottom-0 bg-black/50 hidden'
    if (visible) {
        rootClasses = 'fixed top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center'
    }
    return(
        <div className={rootClasses} onClick={() => setVisible(false)}>
            <div onClick={(e) => e.stopPropagation()} className="p-7 bg-white rounded-2xl min-w-min">
                {children}
            </div>
        </div>
    )
}