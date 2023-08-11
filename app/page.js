import Cat from "@/components/homepage/Cat";
import Faq from "@/components/homepage/Faq";
import Footer from "@/components/homepage/Footer";
import Hero from "@/components/homepage/Hero";
import MapPreview from "@/components/homepage/MapPreview";
import Product from "@/components/homepage/Product";
import { Container, Section } from "@/components/homepage/Styles";
import Image from "next/image";

export const metadata = {
  title: "SubShair | Real Estate Listings for Rental Arbitrage",
};

export default function Home() {
  return (
    <>
      <Container>
        <Hero />
        <Section>
          <MapPreview />
        </Section>
        <Section>
          <Product/>
        </Section>
        <Section style={{overflow: "visible"}}>
          <Faq />
        </Section>
        <Section>
          <Cat />
        </Section>
        <Section>
          <Footer />
        </Section>
      </Container>
    </>
  );
}

