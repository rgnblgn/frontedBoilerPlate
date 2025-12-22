import type { CheckoutEvent, FailureReason } from '@/domain/checkout';
import { payOrder } from '@/services/api/payment.api';

/**
 * Checkout application service
 * - async akışı yönetir
 * - domain event’lerini dispatch eder
 * - domain logic içermez
 */
export class CheckoutService {
    private dispatch: (event: CheckoutEvent) => void
    constructor(dispatch: (event: CheckoutEvent) => void) {
        this.dispatch = dispatch;
    }

    /**
     * Kullanıcı checkout’u başlatır
     */
    startCheckout() {
        this.dispatch({ type: 'START_CHECKOUT' });
    }

    /**
     * Sepet onaylanır
     */
    confirmCart() {
        this.dispatch({ type: 'CONFIRM_CART' });
    }

    /**
     * Adres seçilir
     */
    selectAddress(addressId: string) {
        this.dispatch({
            type: 'SELECT_ADDRESS',
            addressId,
        });
    }

    /**
     * Kargo seçilir
     */
    selectShipping(shippingId: string) {
        this.dispatch({
            type: 'SELECT_SHIPPING',
            shippingId,
        });
    }

    /**
     * Ödeme gönderilir
     * async orchestration burada
     */
    async submitPayment(paymentMethodId: string) {
        // domain: kullanıcı niyeti
        this.dispatch({
            type: 'SUBMIT_PAYMENT',
            paymentMethodId,
        });

        try {
            // infra çağrısı
            await payOrder({
                paymentMethodId,
            });

            // domain: başarı sonucu
            this.dispatch({ type: 'PAYMENT_SUCCESS' });
        } catch (error) {
            const reason: FailureReason = this.mapPaymentError(error);

            // domain: hata sonucu
            this.dispatch({
                type: 'PAYMENT_FAILED',
                reason,
            });
        }
    }

    /**
     * Checkout reset
     */
    reset() {
        this.dispatch({ type: 'RESET' });
    }

    /**
     * Infra error → domain failure reason mapping
     */
    private mapPaymentError(error: unknown): FailureReason {
        // burada bilinçli olarak domain’e sızmıyoruz
        // sadece mapping yapıyoruz

        if (error instanceof Error) {
            return 'PAYMENT_DECLINED';
        }

        return 'UNKNOWN_ERROR';
    }
}
