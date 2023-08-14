import { Inter, Lato, Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ['latin'],
  variable: '--poppins-default'
});

export const lato = Lato({
  weight: ["100", "300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ['latin'],
  variable: '--lato-default'
})

export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ['latin'],
  variable: '--inter-default'
})