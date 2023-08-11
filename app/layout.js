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
