export * from './checkout.types';
export * from './checkout.machine';
export * from './checkout.selectors';
export * from './checkout.rules';
//checkout domain'inin ana giriş noktası olarak işlev görür.
//Burada, checkout ile ilgili tüm modüller dışa aktarılır,
// böylece diğer bölümler bu modüllere tek bir yerden erişebilir.