import { MuiThemeWrapper, ThemeWrapper } from "@/styles/Theme";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ReduxProvider } from "@/provider";
import StyledComponentsRegistry from "@/registery/registery";
import { poppins } from "@/styles/fonts";
import "mapbox-gl/dist/mapbox-gl.css";
import Nav from "@/components/nav/Nav";

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </head>
      <body className={poppins.className}>
        <StyledComponentsRegistry>
          <ThemeWrapper>
            <GlobalStyles />
            <MuiThemeWrapper>
              <ReduxProvider>
                <Nav/>
                {children}
              </ReduxProvider>
            </MuiThemeWrapper>
          </ThemeWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
