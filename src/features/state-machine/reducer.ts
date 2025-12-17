import type { State, Action } from './types';
//import yanında type kullanıldı çünkü type'lar runtime'da var olmayan yapılar. 

export function reducer(state: State, action: Action): State {
    switch (state.status) {
        case 'idle':
            if (action.type === "EDITING") {
                return { status: 'editing', value: action.value };
            }
            return state;
        case 'editing':
            if (action.type === "SUBMIT") {
                return { status: 'submitting' };
            }
            if (action.type === 'TIMEOUT') {
                return { status: 'error', message: 'Timed out' }
            }
            return state;
        case 'submitting':
            if (action.type === "RESOLVE") {
                return { status: 'success' };
            }
            if (action.type === "REJECT") {
                return { status: 'error', message: action.message };
            }
            return state;
        case 'success':
        case 'error':
            if (action.type === "RESET") {
                return { status: 'idle' };
            }
            return state;

        default:
            const _exhaustiveCheck: never = state;
            return _exhaustiveCheck;
        //never tipi, hiçbir değeri temsil etmez. Yeni bir durum eklenip de switch case içinde ele alınmadığında derleme zamanında hata vermesi için kullanılır.

    }
}

//business logic burada tanımlandı. Her state için hangi actionların geçerli olduğu kontrol edildi ve uygun yeni state döndürüldü.
//frontend'te 4 logic yapısı vardır. domain logic'i burada işledik.
//UI logic component içinde olur.
//API logic ise genellikle ayrı dosyalarda veya servislerde yönetilir.
//Son olarak bir de Helper logic olabilir, bu da yardımcı fonksiyonları içerir.