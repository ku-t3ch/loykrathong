import { DefaultSeoProps } from "next-seo";

export default {
  title: "KU Loykrathong 2567",
  description: "KU Loykrathong 2567",
  openGraph: {
    title: "Loykrathong",
    url: "https://festival.tech.nisit.ku.ac.th/loykrathong",
    type: "website",
    description: "KU Loykrathong 2567",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/loykrathong-seo.jpg`,
        width: 1600,
        height: 900,
        alt: "Loykrathong",
      },
    ],
    siteName: "Loykrathong",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "Loykrathong, KU, KUTECH, 2567, 2024, โลยกระทง, มหาวิทยาลัยเกษตรศาสตร์, วิศวกรรมศาสตร์, วิทยาศาสตร์, วิทยาลัยเทคโนโลยีอุตสาหกรรม, วิทยาลัยนานาชาติ, วิทยาลัยนวัตกรรมการผลิตขั้นสูง, วิทยาลัยนวัตกรรมการจัดการอุตสาหกรรม, วิทยาลัยนวัตกรรมการจัดการสารสนเทศ, วิทยาลัยนวัตกรรมการจัดการสาธารณสุข, วิทยาลัยนวัตกรรมการจัดการการท่องเที่ยว, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรร",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "#013968",
    },
    {
      name: "theme-color",
      content: "#013968",
    },
    {
      name: "background-color",
      content: "#013968",
    },
  ],
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
