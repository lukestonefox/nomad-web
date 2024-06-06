// src/components/Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import { useStarred } from '../components/StarredContext';

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

const StarredItem = styled.li`
  margin-bottom: 20px;
`;

const Sidebar: React.FC = () => {
  const { starredItems } = useStarred();
  const navigationBarHeight = document.getElementById('navigation-bar')?.offsetHeight || 0;

  return (
    <SidebarContainer visible={starredItems.length > 0} navigationBarHeight={navigationBarHeight}>
      <h2>Starred Items</h2>
      <ul>
        {starredItems.map((item, index) => (
            <StarredItem key = {index}>
                <h3>{item.name}</h3>
                <p>{item.vicinity}</p>
            </StarredItem>
        ))}
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
