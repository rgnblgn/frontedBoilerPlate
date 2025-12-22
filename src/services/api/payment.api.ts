import { http } from '@/shared/http';

export async function payOrder(data: Record<string, any>) {
    return http.post('/pay', data);
}
//Ödeme işlemi için API çağrısı yapan fonksiyon tanımlandı.