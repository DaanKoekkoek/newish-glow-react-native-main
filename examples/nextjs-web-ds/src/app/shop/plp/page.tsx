"use client"; // Added due to router
import { Box } from "@odido-portals/glow-react-web/box";
import { Button } from "@odido-portals/glow-react-web/button";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";
import { useRouter } from "next/navigation";

import BaseLayout from "../BaseLayout";

const code = `<ShopSection>
  <Stack
    direction={{ mobileSmall: "column", tablet: "row" }}
    columnSize={{ mobileSmall: 12, tablet: 4 }}
  >
    <Box prominence="outline" size="sm">
      <Stack>
        <Paragraph>Product</Paragraph>
        <Button prominence="emphasised">Bekijk</Button>
      </Stack>
    </Box>
    <Box prominence="outline" size="sm">
      <Stack>
        <Paragraph>Product</Paragraph>
        <Button prominence="emphasised">Bekijk</Button>
      </Stack>
    </Box>
  </Stack>
  <Box prominence="color" size="sm">
    <Paragraph>In between content</Paragraph>
  </Box>
  <Stack
    direction={{ mobileSmall: "column", tablet: "row" }}
    columnSize={{ mobileSmall: 12, tablet: 4 }}
  >
    <Box prominence="outline" size="sm">
      <Stack>
        <Paragraph>Product</Paragraph>
        <Button prominence="emphasised">Bekijk</Button>
      </Stack>
    </Box>
    <Box prominence="outline" size="sm">
      <Stack>
        <Paragraph>Product</Paragraph>
        <Button prominence="emphasised">Bekijk</Button>
      </Stack>
    </Box>
  </Stack>
</ShopSection>`;

export default function ExampleShopPlpPage() {
  const router = useRouter();

  return (
    <>
      <BaseLayout type="single" title="Shop PLP example" code={code}>
        <Stack
          direction={{ mobileSmall: "column", tablet: "row" }}
          columnSize={{ mobileSmall: 12, tablet: 4 }}
        >
          <Box prominence="outline" size="sm">
            <Stack>
              <Paragraph>Product</Paragraph>
              <Button
                prominence="emphasised"
                onClick={() => router.push("/shop/pdp")}
                fill
              >
                Bekijk
              </Button>
            </Stack>
          </Box>
          <Box prominence="outline" size="sm">
            <Stack>
              <Paragraph>Product</Paragraph>
              <Button
                prominence="emphasised"
                onClick={() => router.push("/shop/pdp")}
                fill
              >
                Bekijk
              </Button>
            </Stack>
          </Box>
          <Box prominence="outline" size="sm">
            <Stack>
              <Paragraph>Product</Paragraph>
              <Button
                prominence="emphasised"
                onClick={() => router.push("/shop/pdp")}
                fill
              >
                Bekijk
              </Button>
            </Stack>
          </Box>
        </Stack>
        <Box prominence="color" size="sm">
          <Paragraph>In between content</Paragraph>
        </Box>
        <Stack
          direction={{ mobileSmall: "column", tablet: "row" }}
          columnSize={{ mobileSmall: 12, tablet: 4 }}
        >
          <Box prominence="outline" size="sm">
            <Stack>
              <Paragraph>Product</Paragraph>
              <Button
                prominence="emphasised"
                onClick={() => router.push("/shop/pdp")}
                fill
              >
                Bekijk
              </Button>
            </Stack>
          </Box>
          <Box prominence="outline" size="sm">
            <Stack>
              <Paragraph>Product</Paragraph>
              <Button
                prominence="emphasised"
                onClick={() => router.push("/shop/pdp")}
                fill
              >
                Bekijk
              </Button>
            </Stack>
          </Box>
          <Box prominence="outline" size="sm">
            <Stack>
              <Paragraph>Product</Paragraph>
              <Button
                prominence="emphasised"
                onClick={() => router.push("/shop/pdp")}
                fill
              >
                Bekijk
              </Button>
            </Stack>
          </Box>
        </Stack>
      </BaseLayout>
    </>
  );
}
