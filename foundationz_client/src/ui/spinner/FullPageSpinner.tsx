import styled from "styled-components";
import { Spinner } from "grommet";

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const FullPageSpinner = () => {
  return (
    <Container>
      <Spinner size={"large"} alignSelf={"center"} />
    </Container>
  );
};
