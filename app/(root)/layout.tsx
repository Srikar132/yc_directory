import React from "react";
import Navbar from "@/components/Navbar";


const RootLayout = ({children} : Readonly<{children: React.ReactNode}>) => (
    <div className={`font-work-sans`}>
        <Navbar/>
        {children}
    </div>
);

export default RootLayout;