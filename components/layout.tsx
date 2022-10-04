import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "./layout.module.css";
import { Header } from "../components/Header";
import { Spacing } from "../components/shared";

export const siteTitle = "Medoozah Jay Ess's Store";

const Link = styled.a`
  margin: 3rem 0 0;
  display: inline-block;
`;

type LayoutProps = {
  children: React.ReactNode;
  home?: boolean;
};

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Medoozah Jay Esse Storefront" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header>
        <Image src="/images/medusa.png" width={75} height={75} />
        <Spacing left="m">
          <h1>Medoozah Jay Esse</h1>
        </Spacing>
      </Header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to products</Link>
        </div>
      )}
    </div>
  );
}
