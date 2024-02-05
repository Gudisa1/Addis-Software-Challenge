import styled from "@emotion/styled";

// Styled Component Styling
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  flex-wrap: wrap;
`;

const LeftSection = styled.div`
  padding: 40px;
  width: 590px;
`;

const RightSection = styled.div`
  width: max-content;
`;

const Title = styled.h1`
  color: black; /* Change text color to black */
  font-size: 3rem;
  letter-spacing: 2px;
  margin: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 0 20px 20px 10px;
  color: black; /* Change text color to black */
`;

const Btn = styled.button`
  padding: 15px 30px;
  margin: 20px;
  background-color: rgb(72 149 250);
  color: white;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 50px;
  transition: 0.6s;
  :hover {
    background-color: #224dc2;
    transition: 0.6s;
  }
`;

const Img = styled.img`
  width: 550px;
  margin: 20px;
`;

// Hero component
function Hero() {
  return (
    <div className="App">
      <Container>
        <LeftSection data-aos="fade-left" data-aos-duration="1000">
          <Title>Hello, I'm a Song Enthusiast</Title>
          <Description>
            Discover the beauty of melodies and the power of lyrics. Immerse
            yourself in the soulful tunes that resonate with emotions and tell
            stories. Let the music take you on a journey through different moods
            and experiences.
          </Description>
          <Btn>Explore Songs</Btn>
        </LeftSection>
        <RightSection data-aos="fade-right" data-aos-duration="1000">
          <Img
            src="https://images.unsplash.com/photo-1515010137531-66995c7f40e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c29uZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Song Illustration"
          />
        </RightSection>
      </Container>
    </div>
  );
}

export default Hero;
