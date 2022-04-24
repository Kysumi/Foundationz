import type { ThemeType } from 'grommet'
import { css } from 'styled-components'

export const GlobalTheme: ThemeType = {
    global: {
        colors: {},
        font: {
            family: 'Montserrat',
        },
    },
    anchor: {
        extend: () => css`
            box-shadow: unset;
        `,
    },
    button: {
        border: {
            radius: '12px',
        },
    },
}
