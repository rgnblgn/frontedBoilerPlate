import type { CheckoutState, CheckoutEvent } from './checkout.types';

export function checkoutTransition(
    state: CheckoutState,
    event: CheckoutEvent
): CheckoutState {
    switch (state.status) {
        case 'idle':
            if (event.type === 'START_CHECKOUT') {
                return { status: 'cart_review' };
            }
            return state;

        case 'cart_review':
            if (event.type === 'CONFIRM_CART') {
                return { status: 'address' };
            }
            return state;

        case 'address':
            if (event.type === 'SELECT_ADDRESS') {
                return { status: 'shipping' };
            }
            return state;

        case 'shipping':
            if (event.type === 'SELECT_SHIPPING') {
                return { status: 'payment' };
            }
            return state;

        case 'payment':
            if (event.type === 'SUBMIT_PAYMENT') {
                return { status: 'confirmation' };
            }
            return state;

        case 'confirmation':
            if (event.type === 'PAYMENT_SUCCESS') {
                return { status: 'completed' };
            }
            if (event.type === 'PAYMENT_FAILED') {
                return { status: 'failed', reason: event.reason };
            }
            return state;

        case 'failed':
            if (event.type === 'RESET') {
                return { status: 'cart_review' };
            }
            return state;

        case 'completed':
            return state;
    }
}
//checkout süreci için state transition fonksiyonu tanımlandı.
//Her state için geçerli eventler kontrol edildi ve uygun yeni state döndürüldü.
