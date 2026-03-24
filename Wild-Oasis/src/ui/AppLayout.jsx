import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import styled, { css } from 'styled-components';
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;
const SyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;
function AppLayout() {
  return (
    <SyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </SyledAppLayout>
  );
}

export default AppLayout;
