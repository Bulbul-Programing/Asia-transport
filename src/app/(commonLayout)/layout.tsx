
import Footer from '@/components/sharedComponent/Footer';
import Navbar from '@/components/sharedComponent/Navbar';
import React from 'react';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default layout;