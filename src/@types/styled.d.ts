// definicao da tipagem do tema

import 'styled-components';
import theme from '../theme';
// importo o tema para usar

declare module 'styled-components' {
    // declaracao do tipo do tema que sera usado no app
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType { }
}