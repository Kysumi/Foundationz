import { Box, Button, Calendar as Cal, DropButton, Grid } from 'grommet';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData'; // Days of the week
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import * as Icons from 'grommet-icons';

dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const getSplits = ({ open, close }: { open: string; close: string }) => {
    //Data
    let x = {
        slotInterval: 30,
        openTime: open,
        closeTime: close,
    };

    //Format the time
    let startTime = dayjs(x.openTime, 'HH:mm');

    //Format the end time
    let endTime = dayjs(x.closeTime, 'HH:mm');

    //Times
    let allTimes = [];

    //Loop over the times - only pushes time with 30 minutes interval
    while (startTime < endTime) {
        //Push times
        allTimes.push(startTime.format('HH:mm'));
        //Add interval of 30 minutes
        startTime = startTime.add(x.slotInterval, 'minutes');
    }

    return allTimes;
};

const Header = () => {
    const weekDays = dayjs.weekdaysShort();

    return (
        <>
            {weekDays.map((day) => {
                return (
                    <Box key={day} margin={{ left: 'auto', right: 'auto' }}>
                        {day}
                    </Box>
                );
            })}
        </>
    );
};

const SideBar = () => {
    const splits = getSplits({
        open: '08:00',
        close: '17:30',
    });

    return (
        <>
            {splits.map((split) => {
                return (
                    <Box key={split} height={'small'}>
                        {split}
                    </Box>
                );
            })}
        </>
    );
};

const Navigation = () => {
    const date = dayjs();
    const temp = (select: string | string[]) => {
        console.log(select);
    };

    return (
        <Box
            direction={'row'}
            align={'center'}
            pad={{ top: 'small', bottom: 'small' }}
        >
            <Button icon={<Icons.CaretLeftFill />} size={'small'} />
            <Button icon={<Icons.CaretRightFill />} size={'small'} />

            <DropButton
                label={date.format('d MMMM YYYY')}
                dropAlign={{ top: 'bottom' }}
                dropContent={<Cal date={date.toISOString()} onSelect={temp} />}
            />
        </Box>
    );
};

export const Calendar = () => {
    return (
        <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'sidebar', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
            ]}
        >
            <Box gridArea="header">
                <Navigation />
            </Box>
            <Box
                gridArea="sidebar"
                background="dark-2"
                width="xsmall"
                alignContent={'center'}
            >
                <SideBar />
            </Box>

            <Box
                gridArea={'main'}
                direction={'row'}
                pad={'small'}
                border={{ side: 'top', size: 'small' }}
            >
                <Header />
            </Box>
        </Grid>
    );
};
