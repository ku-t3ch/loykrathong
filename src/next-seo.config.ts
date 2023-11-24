import { DefaultSeoProps } from "next-seo";

export default {
  title: "Loykrathong 2566",
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
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "Loykrathong, KU, KUTECH, 2566, 2021, โลยกระทง, มหาวิทยาลัยเกษตรศาสตร์, วิศวกรรมศาสตร์, วิทยาศาสตร์, วิทยาลัยเทคโนโลยีอุตสาหกรรม, วิทยาลัยนานาชาติ, วิทยาลัยนวัตกรรมการผลิตขั้นสูง, วิทยาลัยนวัตกรรมการจัดการอุตสาหกรรม, วิทยาลัยนวัตกรรมการจัดการสารสนเทศ, วิทยาลัยนวัตกรรมการจัดการสาธารณสุข, วิทยาลัยนวัตกรรมการจัดการการท่องเที่ยว, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรรมการจัดการการบินและการจัดการสนามบิน, วิทยาลัยนวัตกรร",
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
