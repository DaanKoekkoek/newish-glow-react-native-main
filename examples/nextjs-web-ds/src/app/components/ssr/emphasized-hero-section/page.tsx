import { Button } from "@odido-portals/glow-react-web/button";
import { DefaultList } from "@odido-portals/glow-react-web/default-list";
import { EmphasizedHero } from "@odido-portals/glow-react-web/emphasized-hero";
import { EmphasizedHeroSection } from "@odido-portals/glow-react-web/emphasized-hero-section";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Price } from "@odido-portals/glow-react-web/price";

import BaseLayout from "../../../BaseLayout";

export default function EmphasizedHeroSectionPage() {
  return (
    <BaseLayout title="EmphasizedHeroSection" grid="custom">
      <EmphasizedHeroSection>
        <EmphasizedHero
          heading={{ title: "Heading [highlighted]", subTitle: "Subtitle" }}
          sticker={{
            type: "default",
            description: "LargeSticker description",
            price: <Price value="10,00" />,
          }}
          visual={{
            src: "https://a.storyblok.com/f/145395/600x620/e01c87f4af/hc-fg-c_samsung_s25_edge_jetblack_watch7_front-back_600x620.webp?cv=1749042512231",
            alt: "Alt text",
          }}
          callToAction={[
            <Button key="btn-1" fill={{ mobileSmall: true, laptop: false }}>
              Button 1
            </Button>,
            <Button
              key="btn-2"
              prominence="secondary"
              fill={{ mobileSmall: true, laptop: false }}
            >
              Button 2
            </Button>,
          ]}
        >
          <Paragraph>Content</Paragraph>
          <DefaultList
            variant="icon"
            items={[
              {
                icon: "checkmark",
                text: "Item 1",
              },
              {
                icon: "checkmark",
                text: "Item 2",
              },
              {
                icon: "checkmark",
                text: "Item 3",
              },
            ]}
          />
        </EmphasizedHero>
      </EmphasizedHeroSection>
    </BaseLayout>
  );
}
