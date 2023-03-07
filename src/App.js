import { Counter } from "./components/Counter";
import { useState, useEffect } from "react";
import { Modal } from "./modal/Modal";
import { Timer } from "./components/Timer";
import { Buster } from "./modal/Buster";
import { Casino } from "./components/Casino";

function App() {

  const [state, setState] = useState({
    modalState_shop: false,
    modalState_casino: false,
    prize: 0,
    multiplier: 1,
    auto_cliker: 0,
    count: 100000,
    costs_mult: [200, 500, 1000, 1500],
    costs_index_mult: 0,
    costs_auto: [50, 150, 250, 300, 400, 450],
    costs_index_auto: 0,
    costs_casino: [5000, 10000, 20000],
    costs_index_casino: 0,
    isCasino: false,
    casinoChance: 0.5,
    casino_max: false,
  });

  const cost_multiplier = state.costs_mult[state.costs_index_mult];
  const cost_auto = state.costs_auto[state.costs_index_auto];
  const cost_casino = state.costs_casino[state.costs_index_casino];

  useEffect(() => {
    var dsa = setTimeout(() => setState({...state, count: state.count + state.auto_cliker}), 1000);
    return () => clearInterval(dsa)
  });

  const price_format = (value) => {
    let price = String(value);
    let result = [];
    let new_str = [...price].reverse().join("");
    let rightSplit = new_str.match(/.{1,3}/g).reverse();
    for (let item of rightSplit) {
        result.push([...item].reverse().join(""));
    }
    return result.join(",");
  }

  return (
    <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between">    
          <Modal
            visible={state.modalState_shop}
            setVisible={value => setState({...state, modalState_shop: value})}
            className='mx-auto'
          >
            <h1 className="text-3xl font-semibold text-center mb-3">Busters</h1>
            <div className="flex justify-between">
              <Buster 
                visible={state.modalState_shop} 
                nameHeader='Увеличить множитель за клик' 
                onClick={() => {
                  setState({
                    ...state,
                    costs_index_mult: (state.costs_index_mult + 1) >= state.costs_mult.length ? state.costs_mult.length - 1 : state.costs_index_mult + 1,
                    count: state.count - cost_multiplier,
                    multiplier: state.multiplier + 1
                  });
                }} 
                cost={cost_multiplier} 
                count={state.count}
              />
              <Buster
                visible={state.modalState_shop}
                nameHeader='Автокликер'
                onClick={() => {
                  setState({
                    ...state,
                    costs_index_auto: (state.costs_index_auto + 1) >= state.costs_auto.length ? state.costs_auto.length - 1 : state.costs_index_auto + 1,
                    count: state.count - cost_auto,
                    auto_cliker: state.auto_cliker + 1
                  })
                }}
                cost={cost_auto}
                count={state.count}
              />
                {state.isCasino === false && <Buster
                  visible={state.modalState_shop}
                  nameHeader="Открыть казино"
                  onClick={() => {
                    setState({
                      ...state,
                      count: state.count - 10,
                      isCasino: true
                    })
                  }}
                  cost={5000}
                  count={state.count}
                ></Buster>}
                {state.casino_max === false && state.isCasino && <Buster
                  visible={state.modalState_shop}
                  nameHeader="Увеличить шанс казино на 0.1"
                  onClick={() => {
                    setState({
                      ...state,
                      costs_index_casino: (state.costs_index_casino + 1 >= state.costs_casino.length) ? state.costs_casino.length - 1 : state.costs_index_casino + 1,
                      casinoChance: state.casinoChance + 0.1,
                      casino_max: state.casinoChance > 0.79 ? state.casino_max = true : state.casino_max = false,
                      count: state.count - cost_casino
                    })
                  }}
                  cost={cost_casino}
                  count={state.count}
                ></Buster>}
            </div>
            
          </Modal>
          <Modal 
          visible={state.modalState_casino}
          setVisible={value => setState({...state, modalState_casino: value})}
          >
            <Casino
            price_format={price_format}
            setCount={value => setState({...state, count: value})}
            setChance={value => setState({...state, casinoChance: value})}
            count={state.count}
            chance={state.casinoChance}
            ></Casino>
          </Modal>
          <Counter 
            count={state.count} 
            onMouseEnter={() => setState({...state, count: state.count + state.multiplier})} 
            onMouseLeave={() => setState({...state, count: state.count + state.multiplier})}
            onClick={() => setState({...state, count: state.count + state.multiplier})}
            price_format={price_format}
            ></Counter>
          
          <div className="flex items-center ">
            <Timer></Timer>
            <button 
              className="bg-slate-400 rounded-full px-3 py-3 text-white hover:bg-slate-500 ml-3" 
              onClick={() => setState({...state, modalState_shop:true})}>Магазин</button>
            {state.isCasino && <button 
              className="bg-slate-400 rounded-full px-5 py-3 text-white hover:bg-slate-500 ml-3" 
              onClick={() => setState({...state, modalState_casino:true})}>Казино</button>}
          </div>
        </div>
    </div>
  );
}

export default App;
