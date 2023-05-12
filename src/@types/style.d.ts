import 'styled-components';
import themes from '@theme/themes';

declare module 'styled-components' {
    type ThemeType = typeof themes;

    export interface DefaultTheme extends ThemeType {}
}