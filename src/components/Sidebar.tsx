// src/components/Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import { useStarred } from '../components/StarredContext';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled.div<{ visible: boolean, navigationBarHeight: number }>`
  position: fixed;
  right: 0;
  top: ${({navigationBarHeight}) => navigationBarHeight + 10}px;
  height: 100%;
  width: 300px;
  background-color: #f4f4f4;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: ${props => (props.visible ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  z-index: 1000;
  overflow-y: auto; /* Enable vertical scrollbar */
`;

const StarredItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;

const ItemDetails = styled.p`
  margin: 8px 0;
  color: #777;
`;

const UnstarButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #d9363e;
  }
`;

const NavigationButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation(); // Use the useLocation hook to get the current path
  const isOnTripPlannerPage = location.pathname === '/trip-planner'; // Check if the current path is the trip planner page
  const { starredItems } = useStarred();
  const navigationBarHeight = document.getElementById('navigation-bar')?.offsetHeight || 0;

  return (
    <SidebarContainer visible={starredItems.length > 0} className='flex flex-col items-center' navigationBarHeight={navigationBarHeight}>
      <h2 className='mb-4 text-xl font-bold'>Starred Items</h2>
      <div className='flex flex-col items-center'>
        {starredItems.map((item, index) => (
          <StarredItem key={index}>
        
          </StarredItem>
        ))}
      </div>
      <NavigationButton to={isOnTripPlannerPage ? "/" : "/trip-planner"}>
        {isOnTripPlannerPage ? "Back to Main Page" : "Go to Trip Planner"}
      </NavigationButton>
    </SidebarContainer>
  );
};

export default Sidebar;