import { Box, Button, Grid, Nav, Sidebar } from 'grommet';
import * as Icons from 'grommet-icons';
import { Calendar } from '~/component/calendar/Calendar';

export default function IndexRoute() {
    return (
        <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
                { name: 'sidebar', start: [0, 0], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
            ]}
        >
            <Sidebar
                gridArea="sidebar"
                background="brand"
                footer={
                    <Button
                        icon={<Icons.Up />}
                        hoverIndicator
                        onClick={() =>
                            window.scroll({ behavior: 'smooth', top: 0 })
                        }
                    />
                }
            >
                <Nav gap="small">
                    <Button icon={<Icons.Projects />} hoverIndicator />
                    <Button icon={<Icons.Clock />} hoverIndicator />
                </Nav>
            </Sidebar>

            <Box gridArea={'main'} direction={'row'}>
                <Calendar />
            </Box>
        </Grid>
    );
}
