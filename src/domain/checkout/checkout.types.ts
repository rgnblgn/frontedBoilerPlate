export type CheckoutState =
    | { status: 'idle' }
    | { status: 'cart_review' }
    | { status: 'address' }
    | { status: 'shipping' }
    | { status: 'payment' }
    | { status: 'confirmation' }
    | { status: 'completed' }
    | { status: 'failed'; reason: FailureReason };

export type CheckoutEvent =
    | { type: 'START_CHECKOUT' }
    | { type: 'CONFIRM_CART' }
    | { type: 'SELECT_ADDRESS'; addressId: string }
    | { type: 'SELECT_SHIPPING'; shippingId: string }
    | { type: 'SUBMIT_PAYMENT'; paymentMethodId: string }
    | { type: 'CONFIRM_ORDER' }
    | { type: 'PAYMENT_SUCCESS' }
    | { type: 'PAYMENT_FAILED'; reason: FailureReason }
    | { type: 'RESET' };

export type FailureReason =
    | 'PAYMENT_DECLINED'
    | 'OUT_OF_STOCK'
    | 'INVALID_ADDRESS'
    | 'UNKNOWN_ERROR';
//Checkout süreci için state ve event tipleri tanımlandı.
// Her state, checkout sürecinin farklı bir aşamasını temsil ederken,
// eventler bu aşamalar arasında geçişi tetikleyen eylemleri temsil eder.