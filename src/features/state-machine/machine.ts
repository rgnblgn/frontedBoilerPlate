import { reducer } from './reducer'
import type { State, Action } from './types'

export function createStateMachine(initialState: State) {
    let state = initialState
    let listeners: Array<(state: State) => void> = [] //subscriber'lar için liste
    let timeoutId: number | null = null

    function notify() {//tüm subscriber'ları bilgilendir
        listeners.forEach((listener) => listener(state))
    }

    function dispatch(action: Action) {
        state = reducer(state, action)
        notify()

        // 👇 DOMAIN KARARI: editing uzun sürerse timeout
        if (state.status === 'editing') {
            if (timeoutId) clearTimeout(timeoutId)

            timeoutId = window.setTimeout(() => {
                dispatch({ type: 'TIMEOUT' })
            }, 5000)
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
            }
        }
    }

    return {
        getState() {
            return state
        },

        dispatch,

        subscribe(listener: (state: State) => void) {
            listeners.push(listener)
            return () => {
                listeners = listeners.filter((l) => l !== listener)
            }
        }
    }
}

//state machine burada oluşturuldu. initial state alır ve dispatch ile actionları işler.
// neden bunu yaptık? Çünkü uygulama state'ini merkezi bir yerde yönetmek ve
// state değişikliklerini izlemek istiyoruz. Bu, özellikle karmaşık uygulamalarda state yönetimini
// kolaylaştırır ve bileşenlerin birbirinden bağımsız olarak güncellenmesini sağlar.
// subscribe metodu ile dışarıdan state değişikliklerini dinleyebiliriz.
// Bu, React bileşenlerinin state machine'den gelen güncellemeleri almasını sağlar.
// State'i react'ten ayırdık çünkü state management
// kütüphaneleri genellikle UI kütüphanelerinden bağımsızdır.