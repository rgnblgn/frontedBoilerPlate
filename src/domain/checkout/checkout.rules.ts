import type { CheckoutState } from './checkout.types';

/**
 * TERMINAL STATE
 * Bu state’lerden sonra checkout ilerlemez
 */
export function isTerminalState(state: CheckoutState): boolean {
    return state.status === 'completed' || state.status === 'failed';
}

/**
 * CART
 */
export function canConfirmCart(state: CheckoutState): boolean {
    return state.status === 'cart_review';
}

/**
 * ADDRESS
 */
export function canSelectAddress(state: CheckoutState): boolean {
    return state.status === 'address';
}

/**
 * SHIPPING
 */
export function canSelectShipping(state: CheckoutState): boolean {
    return state.status === 'shipping';
}

/**
 * PAYMENT
 * Ödeme yapılabilmesi için gerekli minimum koşullar
 */
export function canSubmitPayment(state: CheckoutState): boolean {
    if (state.status !== 'payment') return false;

    // burada ileride genişletilebilir:
    // - address var mı
    // - shipping var mı
    // - stock uygun mu
    return true;
}

/**
 * CONFIRMATION
 * Ödeme sonucu beklenirken başka event kabul edilmez
 */
export function isWaitingForPaymentResult(state: CheckoutState): boolean {
    return state.status === 'confirmation';
}

/**
 * RESET
 * Checkout hangi durumlarda sıfırlanabilir?
 */
export function canResetCheckout(state: CheckoutState): boolean {
    return state.status === 'failed' || state.status === 'completed';
}

/**
 * BACKWARD NAVIGATION (opsiyonel ama advanced)
 * Geri gitmeye izin veriyor muyuz?
 */
export function canGoBack(state: CheckoutState): boolean {
    switch (state.status) {
        case 'address':
        case 'shipping':
        case 'payment':
            return true;
        default:
            return false;
    }
}

/**
 * DEBUG / SAFETY
 * State geçerli mi? (runtime guard)
 */
export function isValidCheckoutState(state: CheckoutState): boolean {
    return (
        state.status === 'idle' ||
        state.status === 'cart_review' ||
        state.status === 'address' ||
        state.status === 'shipping' ||
        state.status === 'payment' ||
        state.status === 'confirmation' ||
        state.status === 'completed' ||
        state.status === 'failed'
    );
}


//checkout süreci için iş kuralları fonksiyonları tanımlandı.
//Her fonksiyon, checkout state'inin belirli bir eylemi gerçekleştirip gerçekleştiremeyeceğini kontrol eder.
//Bu kurallar, checkout sürecinin mantığını ve geçişlerini yönetir.