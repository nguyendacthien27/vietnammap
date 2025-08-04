export interface Store {
    id: number;
    name: string;
    address: string;
    phone: string,
    image: string,
    description: string,
    position : [number, number];
}

export const stores: Store[] = [
    {
        id: 1,
        name: 'TH True Mart',
        address: '342 hoặc, A1/5 Cộng Hòa, Tân Bình, Hồ Chí Minh, Việt Nam',
        phone: '0979xxxx',
        image: 'https://images.viblo.asia/full/171ffa2b-6b95-4ec8-838e-f8d8eedbd229.png',
        description: 'TH True Mart T',
        position: [10.802291546006385, 106.64550349349757]
    },
    {
        id: 2,
        name: 'Store Test',
        address: '415 Đ. Hoàng Văn Thụ, Phường 2, Tân Bình, Hồ Chí Minh, Việt Nam',
        phone: '0979xxxx',
        image: 'https://images.viblo.asia/full/171ffa2b-6b95-4ec8-838e-f8d8eedbd229.png',
        description: 'Store Test Description',
        position: [10.798831331028987, 106.66017142197153]
    }
];