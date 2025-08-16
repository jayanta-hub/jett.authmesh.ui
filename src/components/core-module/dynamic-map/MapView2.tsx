import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet-curve";
import "leaflet-rotatedmarker";
import './FlightMap.css';
import AutoFitBounds from "./AutoFitBounds";
import { FlightPath } from "../../../utility/types/map/MapView";

const customCircleIcon = (index: number) => new L.DivIcon({
    className: index < 1 ? 'custom-circle-icon3' : 'custom-circle-icon2',
    html: '',
    iconSize: index < 1 ? [9, 9] : [6, 6],
    iconAnchor: [3, 4],
});

const largeCircleIcon = (index: number) => new L.DivIcon({
    className: index < 1 ? 'custom-circle-icon-large' : '',
    html: '',
    iconSize: [33, 33],
    iconAnchor: [15, 15],
});


const createCustomIcon = (flightDuration: string, flighingDates: string) => {

    return L.divIcon({
        html: `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: start;
            background: white;
            padding: 2px 2px;
            width: 95px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            white-space: nowrap;
            background-color: #0087FACC;
            color: #FFFFFF;
          ">
          <span style="margin-left: 3px;">${flightDuration}</span>
           <span style="margin-left: 3px;">${flighingDates}</span>
          </div>
        `,
        className: "custom-flight-icon",
        iconSize: [60, 10], // Adjust width for longer durations
        iconAnchor: [50, 1], // Adjust placement
    });
};



const generateCurve = (start: number[], end: number[]) => {
    if (!start || !end || !Array.isArray(start) || !Array.isArray(end)) {
        console.error("Invalid start or end point:", start, end);
        return [start, end]; // Fallback to straight line
    }
    const [startLat, startLng] = start;
    const [endLat, endLng] = end;
    const distance = L.latLng({ lat: startLat, lng: startLng }).distanceTo(L.latLng({ lat: endLat, lng: endLng }));

    // Adjust the curve intensity based on distance
    let controlFactor = distance > 2000000 ? (distance > 9000000 ? 0.2 : 0.15) : 0.15;

    // Determine direction: East (clockwise) or West (anticlockwise)
    if (endLng < startLng) {
        controlFactor *= -1; // Flip for westward curves (anticlockwise)
    }

    const dx = endLng - startLng;
    const dy = endLat - startLat;
    const control = [
        (startLat + endLat) / 2 + controlFactor * dx,
        (startLng + endLng) / 2 - controlFactor * dy,
    ];

    const curve = [];
    for (let t = 0; t <= 1; t += 0.02) {
        const lat = (1 - t) * (1 - t) * startLat + 2 * (1 - t) * t * control[0] + t * t * endLat;
        const lng = (1 - t) * (1 - t) * startLng + 2 * (1 - t) * t * control[1] + t * t * endLng;
        curve.push([lat, lng]);
    }

    if (curve.length < 2) {
        return [start, end]; // Ensure at least two points
    }
    curve[0] = start;
    curve[curve.length - 1] = end;
    return curve;
};

// Function to calculate bearing between two points
const getBearing = (start: number[], end: number[]) => {
    const lat1 = (Math.PI / 180) * start[0];
    const lat2 = (Math.PI / 180) * end[0];
    const dLng = (Math.PI / 180) * (end[1] - start[1]);

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
};

// Multi-Destination Flight Paths
const MapView2 = ({ startPoints, destinations, height, width, flightDurations, flighingDates }: any) => {
    const [flightPaths, setFlightPaths] = useState<FlightPath[]>([]);

    useEffect(() => {
        if (!startPoints || !destinations || startPoints.length !== destinations.length) return;

        const paths = startPoints.map((start, index) => {
            const destination = destinations[index];
            if (!start || !destination) return null;

            const curve = generateCurve(start, destination);
            const midIndex = Math.floor(curve.length / 2);
            const midpoint = curve[midIndex];
            const bearing = getBearing(curve[midIndex - 1] || start, curve[midIndex] || destination);

            return { curve, midpoint, bearing, destination };
        }).filter(Boolean); // Remove null values

        setFlightPaths(paths);
    }, [startPoints, destinations]);

    return (
        <MapContainer center={startPoints[0]} zoom={3} minZoom={2} style={{ height: height, width: width }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* <AutoFitBounds flightPath={flightPaths} /> */}

            {/* Render Multiple Flight Paths */}
            {flightPaths.map((flight, index) => (
                <React.Fragment key={index}>
                    <Polyline positions={flight.curve} color="#FFC000" weight={.5} />
                    {startPoints[index] && index < 1 && <Marker position={startPoints[index]} icon={createCustomIcon(flightDurations[index], flighingDates[index])} />}
                    {flight.destination && index < 1 && <Marker position={flight.destination} icon={createCustomIcon(flightDurations[1], flighingDates[1])} />}
                    {flight.destination && <Marker position={flight.destination} icon={customCircleIcon(index)} />}
                    {startPoints[index] && <Marker position={startPoints[index]} icon={customCircleIcon(index)} />}
                    {flight.destination && <Marker position={flight.destination} icon={largeCircleIcon(index)} />}
                    {startPoints[index] && <Marker position={startPoints[index]} icon={largeCircleIcon(index)} />}
                </React.Fragment>
            ))}
        </MapContainer>
    );
};


export default MapView2;