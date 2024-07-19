import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIconButton from '@mui/icons-material/Menu';
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
        <header>
            <nav className="fixed top-0 z-20 flex items-center justify-between w-full p-4 text-white shadow-lg backdrop-blur-md bg-opacity-70" id="navigation-bar">
                <h1 className="text-2xl font-extrabold">Nomad</h1>
                <div className="flex items-center pr-6 gap-x-6">
                    <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={goToTripPlanner}>Trip Planner</button>
                    <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={() => scrollToLocation("hotels-list")}>Hotels</button>
                    <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={() => scrollToLocation("activities-list")}>Activities</button>
                    <button type="button" className="p-2 duration-200 rounded-md hover:bg-blue-400" onClick={() => scrollToLocation("places-to-see-list")}>Places to See</button>
                    <MenuIconButton className="cursor-pointer" onClick={onSidebarToggle} />
                </div>
            </nav>
        </header>
    );
};

export default NavigationBar;
