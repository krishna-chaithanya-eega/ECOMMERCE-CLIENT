import styled from 'styled-components';

const Container=styled.div`
    height:27px;
    background-color:#7fffd4;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:14px;
    font-weight:500;
    


`

const Announcement = () => {
    return (
        <Container>
            Super Deal ! Free shipping on orders above Rs.500/-
        </Container>
    )
}

export default Announcement
