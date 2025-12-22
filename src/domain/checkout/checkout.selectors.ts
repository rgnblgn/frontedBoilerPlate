import type { CheckoutState } from './checkout.types';

/**
 * Genel status selector
 */
export function getCheckoutStatus(state: CheckoutState) {
    return state.status;
}

/**
 * Adım bazlı selector’lar
 * UI hangi ekranı gösterecek?
 */
export function isIdle(state: CheckoutState): boolean {
    return state.status === 'idle';
}

export function isCartReview(state: CheckoutState): boolean {
    return state.status === 'cart_review';
}

export function isAddressStep(state: CheckoutState): boolean {
    return state.status === 'address';
}

export function isShippingStep(state: CheckoutState): boolean {
    return state.status === 'shipping';
}

export function isPaymentStep(state: CheckoutState): boolean {
    return state.status === 'payment';
}

export function isConfirmationStep(state: CheckoutState): boolean {
    return state.status === 'confirmation';
}

/**
 * Terminal state’ler
 */
export function isCompleted(state: CheckoutState): boolean {
    return state.status === 'completed';
}

export function isFailed(state: CheckoutState): boolean {
    return state.status === 'failed';
}

/**
 * Error bilgisi
 */
export function getFailureReason(state: CheckoutState): string | null {
    return state.status === 'failed' ? state.reason : null;
}

/**
 * UI için yardımcı selector’lar
 */
export function isTerminal(state: CheckoutState): boolean {
    return state.status === 'completed' || state.status === 'failed';
}

export function getCurrentStepIndex(state: CheckoutState): number {
    switch (state.status) {
        case 'idle':
            return 0;
        case 'cart_review':
            return 1;
        case 'address':
            return 2;
        case 'shipping':
            return 3;
        case 'payment':
            return 4;
        case 'confirmation':
            return 5;
        case 'completed':
        case 'failed':
            return 6;
        default: {
            const _exhaustive: never = state;
            return _exhaustive;
        }
    }
}
//checkout süreci için selector fonksiyonları tanımlandı.
//Her fonksiyon, checkout state'inden belirli bilgileri çıkarmak veya
// belirli durumları kontrol etmek için kullanılır.
// rules'tan farkı, burada sadece state'den veri çekme ve kontrol işlemleri yapılır,
// iş kuralları veya geçiş mantığı içermez.
