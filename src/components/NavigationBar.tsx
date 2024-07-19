import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

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
            <nav className="fixed top-0 z-20 flex items-center justify-between w-full px-6 py-4 text-white shadow-lg backdrop-blur-md bg-opacity-70" id="navigation-bar">
                {/* <h1 className="text-2xl font-extrabold">Nomad</h1> */}
                <Link to="/">
                    <img src='../NOMAD.svg' title='logo' width={170} className='duration-100 cursor-pointer hover:opacity-75'/>
                </Link>
                <div className="flex items-center pr-6 gap-x-6">
                    <button type="button" className="px-3 py-2 duration-200 rounded-md hover:bg-blue-500 hover:bg-opacity-45" onClick={goToTripPlanner}>Trip Planner</button>
                    <button type="button" className="px-3 py-2 duration-200 rounded-md hover:bg-blue-500 hover:bg-opacity-45" onClick={() => scrollToLocation("hotels-list")}>Hotels</button>
                    <button type="button" className="px-3 py-2 duration-200 rounded-md hover:bg-blue-500 hover:bg-opacity-45" onClick={() => scrollToLocation("activities-list")}>Activities</button>
                    <button type="button" className="px-3 py-2 duration-200 rounded-md hover:bg-blue-500 hover:bg-opacity-45" onClick={() => scrollToLocation("places-to-see-list")}>Places to See</button>
                    <div className="p-2 duration-200 rounded-md cursor-pointer hover:bg-blue-500 hover:bg-opacity-45" onClick={onSidebarToggle} >
                        <MenuIcon />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavigationBar;
