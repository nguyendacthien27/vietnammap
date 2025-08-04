'use client';

import {useState} from 'react';
import {Store} from '@/data/stores';

type Props = {
    onAdd: (store: Store) => void;
    nextId: number;
};

export default function StoreAddForm({onAdd, nextId}: Props) {
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        image: '',
        description: '',
        lat: '',
        lng: '',
    });

    const handleAdd = () => {
        const {name, address, phone, image, description, lat, lng} = form;
        const [nameTrim, addressTrim, phoneTrim, imageTrim, descriptionTrim, latTrim, lngTrim] =
            [name, address, phone, image, description, lat, lng].map((s) => s.trim());

        if (!nameTrim || !addressTrim || !phoneTrim || !imageTrim || !descriptionTrim || !latTrim || !lngTrim) {
            alert('Please fill all fields.');
            return;
        }

        const store: Store = {
            id: nextId,
            name: nameTrim,
            address: addressTrim,
            phone: phoneTrim,
            image: imageTrim,
            description: descriptionTrim,
            position: [parseFloat(latTrim), parseFloat(lngTrim)],
        };

        onAdd(store);
        setForm({name: '', address: '', phone: '', image: '', description: '', lat: '', lng: ''});
    };

    return (
        <div className="absolute bottom-4 left-4 z-50 bg-white p-4 rounded shadow-md w-[300px]">
            <h3 className="font-bold mb-2 text-lg">Add New Store</h3>
            {['name', 'address', 'phone', 'image', 'description', 'lat', 'lng'].map((field) => (
                <input
                    key={field}
                    type="text"
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                    className="w-full border p-2 rounded mb-2"
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm({...form, [field]: e.target.value})}
                />
            ))}
            <button onClick={handleAdd} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Add Store
            </button>
        </div>
    );
}
