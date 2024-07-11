import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavigationBar: React.FC<{ onSidebarToggle: () => void }> = ({ onSidebarToggle }) => {
    const navigate = useNavigate();

    const scrollToLocation = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            const barHeight = document.getElementById('navigation-bar')?.offsetHeight || 0;
            window.scrollTo({
                top: section.offsetTop - (barHeight + 15),
                behavior: 'smooth'
            });
        }
    };

    const goToTripPlanner = () => {
        navigate('/trip-scheduler');
    };

    return (
        <nav className="fixed top-0 z-20 flex justify-between w-full mt-3 p-4 items-center text-white backdrop-blur-lg bg-opacity-70 bg-[#93C5FD] rounded-lg" id="navigation-bar">
            <h1 className="text-2xl font-extrabold">Nomad</h1>
            <div className="flex gap-x-6">
                <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={goToTripPlanner}>Trip Planner</button>
                <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={() => scrollToLocation("hotels-list")}>Hotels</button>
                <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={() => scrollToLocation("activities-list")}>Activities</button>
                <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={() => scrollToLocation("places-to-see-list")}>Places to See</button>
                <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={onSidebarToggle}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
        </nav>
    );
};

export default NavigationBar;
