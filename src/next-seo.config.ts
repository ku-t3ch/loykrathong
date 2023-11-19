import { DefaultSeoProps } from "next-seo";

export default {
  title: "Loykrathong",
  description: "KU Loykrathong 2566",
  openGraph: {
    title: "Loykrathong",
    url: "http://kutech.club/loykrathong",
    type: "website",
    description: "KU Loykrathong 2566",
    images: [
      {
        url: "https://s3.tech.nisit.ku.ac.th/assets/loykrathong/2566/og-image.png",
        width: 1600,
        height: 900,
        alt: "Loykrathong",
      },
    ],
    siteName: "Loykrathong",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
