'use client';

import {useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {Store, stores as mockStores} from '@/data/stores';
import StoreSearch from './StoreSearch';
import StoreAddForm from './StoreAddForm';
import ChatBubble from './ChatBubble';
import AIChatBubble from './AIChatBubble';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapWithSidebar() {
    const [allStores, setAllStores] = useState<Store[]>(mockStores);
    const [filteredStores, setFilteredStores] = useState<Store[]>(mockStores);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [storeIdCounter, setStoreIdCounter] = useState(mockStores.length + 1);
    const [showChat, setShowChat] = useState(false);

    const handleAdd = (store: Store) => {
        const updated = [...allStores, store];
        setAllStores(updated);
        setFilteredStores(updated);
        setSelectedStore(store);
        setStoreIdCounter((prev) => prev + 1);
    };

    return (
        <div className="relative h-screen w-full">
            <StoreSearch onResults={setFilteredStores} onSelect={setSelectedStore} allStores={allStores}/>
            <StoreAddForm onAdd={handleAdd} nextId={storeIdCounter}/>

            <MapContainer center={[10.8010, 106.6454]} zoom={15} className="h-full w-full z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Array.isArray(filteredStores) && filteredStores.map((store) => (
                    <Marker
                        key={store.id}
                        position={store.position}
                        eventHandlers={{
                            click: () => setSelectedStore(store),
                        }}
                    >
                        <Popup>
                            <strong>{store.name}</strong>
                            <img src={store.image} alt={store.name}/>
                            <p>Description: {store.description}</p>
                            <p>Address: {store.address}</p>
                            <p>Phone: {store.phone}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <ChatBubble onClick={() => setShowChat(true)}/>
            {showChat && <AIChatBubble onClose={() => setShowChat(false)}/>}
        </div>
    );
}