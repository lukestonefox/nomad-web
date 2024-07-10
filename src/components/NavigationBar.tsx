import { styled } from "styled-components";

const NavigationBarContainer = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    background-color: #93C5FD;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 1000;

    h1 {
        font-size: 30px;
    }
`

const ButtonGroup = styled.div`
    display: flex;
    align-itmes: center;

    button {
        border: none;
        color: black;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        background: none;
    }

    button:hover {
        color: white;
        text-decoration: underline;
    }
`

const NavigationBar: React.FC = () => {
    const scrollToLocation = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            const barHeight = document.getElementById('navigation-bar')?.offsetHeight || 0;
            window.scrollTo({
                top:section.offsetTop - (barHeight + 15),
                behavior: 'smooth'
            });
        }
    };

    return (
        <NavigationBarContainer id="navigation-bar">
            <h1>Nomad</h1>
            <ButtonGroup>
                <button type="button" onClick={() => scrollToLocation("hotels-list")}>Hotels</button>
                <button type="button" onClick={() => scrollToLocation("activities-list")}>Activities</button>
                <button type="button" onClick={() => scrollToLocation("places-to-see-list")}>Places to See</button>
            </ButtonGroup>
        </NavigationBarContainer>
    );
};

export default NavigationBar