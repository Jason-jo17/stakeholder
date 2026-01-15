"use client"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { StakeholderProfile } from "@/types"
import { Icon } from 'leaflet'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Fix for default Leaflet markers not showing in Next.js
const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

interface StakeholderMapProps {
    stakeholders: StakeholderProfile[]
}

export default function StakeholderMap({ stakeholders }: StakeholderMapProps) {
    const router = useRouter()

    // Default center (Karnataka: roughly between Mangalore and Mysore)
    const center: [number, number] = [12.8000, 75.8000]

    // Filter stakeholders with valid coordinates
    const mapStakeholders = stakeholders.filter(s => s.latitude && s.longitude)

    return (
        <div className="h-[600px] w-full rounded-lg overflow-hidden border z-0">
            <MapContainer
                center={center}
                zoom={8}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mapStakeholders.map(stakeholder => (
                    <Marker
                        key={stakeholder.id}
                        position={[stakeholder.latitude || 0, stakeholder.longitude || 0]}
                        icon={defaultIcon}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-sm">{stakeholder.user.name}</h3>
                                <p className="text-xs text-muted-foreground mb-2">{stakeholder.designation}</p>
                                <p className="text-xs mb-2 truncate">{stakeholder.organization}</p>
                                <Button
                                    size="sm"
                                    className="w-full h-7 text-xs"
                                    onClick={() => router.push(`/stakeholders/${stakeholder.id}`)}
                                >
                                    View Profile <ArrowRight className="h-3 w-3 ml-1" />
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
