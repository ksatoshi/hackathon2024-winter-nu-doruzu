"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// types
type Location = {
    lat: number;
    lng: number;
};

type GeolocationContextType = {
    location: Location | null;
    error: string | null;
};

//context to
const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined);

//hooks
export const useGeolocation = () => {
    const context = useContext(GeolocationContext);
    if (!context) {
        throw new Error("useGeolocation must be used within a GeolocationProvider");
    }
    return context;
};

//provider
export const GeolocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        //fetching user
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    return (
        <GeolocationContext.Provider value={{ location, error }}>
            {children}
        </GeolocationContext.Provider>
    );
};