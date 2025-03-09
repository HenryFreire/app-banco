import React, { useEffect, useState } from "react";
import { LoadingContext } from "./LoadingContext";

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   
    const [loading, setLoading] = useState(false)


    return <LoadingContext.Provider value={{ loading, setLoading }}>
        {children}
    </LoadingContext.Provider>
}

