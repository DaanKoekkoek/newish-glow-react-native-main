"use client";

import { Callout } from "@odido-portals/glow-react-web/callout";
import { DefaultList } from "@odido-portals/glow-react-web/default-list";
import { LargeSticker } from "@odido-portals/glow-react-web/large-sticker";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { ProductHero } from "@odido-portals/glow-react-web/producthero";
import { Stack } from "@odido-portals/glow-react-web/stack";
import { Status } from "@odido-portals/glow-react-web/status";
import {
  StepperInpage,
  StepperInpageStep,
} from "@odido-portals/glow-react-web/stepper-inpage";
import { Visible } from "@odido-portals/glow-react-web/visible";
import React, { useRef, useState } from "react";

import BaseLayout from "../BaseLayout";

import { ClientStickyBar, Selector } from "@/app/ClientComponents";

const code = `
const shoppingCartRef = useRef(null);
const [selected, setSelected] = useState<{ [groupName: string]: string }>({
  "group-1": "selector-1",
  "group-2": "selector-3",
});

const onChangeHandler = (groupName: string, id: string) => {
  setSelected((prev) => ({
    ...prev,
    [groupName]: id,
  }));
};

return (<><ShopSection 
    aside={<ShoppingCart
      ref={shoppingCartRef}
      footnote="Footnote"
      heading={{
        info: <Icon name="status-info" size="sm" />,
        showDivider: true,
        title: "Shopping Cart PDP",
      }}
      callToAction={[
        <Button key="btn-1" as="a" fill prominence="emphasised">
          Button text
        </Button>,
        <Button key="btn-2" as="a" fill prominence="secondary">
          Button text
        </Button>,
      ]}
    >
      <CartAccordionRow
        beforePrice="€0,00"
        cartDetails={
          <CartDetails key="detail-1">
            <CartCategory title="Line item - default">
              <LineItem
                currency="€"
                description="Description"
                discount={[
                  <Discount
                    key="discount-1"
                    currency="€"
                    price="0,00"
                    title="Discount"
                  />,
                  <Discount
                    key="discount-1"
                    currency="€"
                    price="0,00"
                    title="Discount"
                  />,
                  <Discount
                    key="discount-1"
                    currency="€"
                    price="0,00"
                    title="Discount"
                  />,
                ]}
                price="0,00"
                title="Line item"
              />
            </CartCategory>
            <CartCategory title="Line item - Free item">
              <LineItem
                currency="€"
                price="0,00"
                title="Line item - Free item"
                variant="free item"
              />
            </CartCategory>
            <CartCategory title="Line item - Short description">
              <LineItem
                currency="€"
                price="0,00"
                title="Line item - Free item"
                variant="short description"
              />
            </CartCategory>
          </CartDetails>
        }
        price={{
          size: "sm",
          value: "0,00",
        }}
        title="Maandelijks"
      />
      <LineItem
        currency="€"
        description="Description"
        discount={<Discount currency="€" price="0,00" title="Discount" />}
        price="100,00"
        title="Verzekering"
        variant="default"
      />
      <CartAccordionRow
        beforePrice="€0,00"
        cartDetails={
          <>
            <CartDetails>
              <CartCategory title="Category title">
                <LineItem currency="€" price="100" title="Line item" />
              </CartCategory>
            </CartDetails>
          </>
        }
        description={<CartDescription lines={["Description"]} />}
        price={{
          size: "sm",
          value: "0,00",
        }}
        title="Eenmalig"
      />
      <TextLink>
        <Icon name="status-info" size="sm" /> Meer info
      </TextLink>
    </ShoppingCart>}
    above={<Heading size="xl" as="h1">Title</Heading>}>
    <ProductHero
      image={{
        src: "https://a.storyblok.com/f/182771/648x648/9c27e9d49b/odi-3644-30-salescampagne-haastmakers-week-21_648x648_p2.webp",
        alt: "Alt text",
      }}
      status={<Status type="success" statusText="Status" />}
    />
    <StepperInpage>
      <StepperInpageStep
        title="Ontdek je korting"
      >
        <Stack alignItems="stretch">
          <Paragraph>
            Is er ook een ander abonnement van Odido of Ben op je adres?
          </Paragraph>
          <Stack
            direction={{ mobileSmall: "column", tablet: "row" }}
            alignItems="stretch"
          >
            <Selector
              id="selector-1"
              name="group-1"
              title="Selector 1"
              onChange={() => onChangeHandler("group-1", "selector-1")}
              isSelected={selected["group-1"] === "selector-1"}
            />
            <Selector
              id="selector-2"
              name="group-1"
              title="Selector 2"
              onChange={() => onChangeHandler("group-1", "selector-2")}
              isSelected={selected["group-1"] === "selector-2"}
            />
          </Stack>
          <Callout title="Dit zijn de klantvoordelen" status="success" content="alternate">
            <DefaultList
              items={[
                { text: "Elke maand € 5,00 korting op je Internet" },
                {
                  text: "Tot € 7,50 korting per maand op Unlimited abonnementen",
                },
                {
                  text: "Elke maand dubbele data en € 2,50 korting op andere abonnementen van Odido",
                },
                {
                  text: "Tot 5 GB extra data per maand op Ben abonnement met internet bundel",
                },
              ]}
            />
          </Callout>
        </Stack>
      </StepperInpageStep>
      <StepperInpageStep
        title="Looptijd"
      >
        <Stack
          direction={{ mobileSmall: "column", tablet: "row" }}
          alignItems="stretch"
        >
          <Selector
            id="selector-3"
            name="group-2"
            title="Selector 3"
            onChange={() => onChangeHandler("group-2", "selector-3")}
            isSelected={selected["group-2"] === "selector-3"}
          />
          <Selector
            id="selector-4"
            name="group-2"
            title="Selector 4"
            onChange={() => onChangeHandler("group-2", "selector-4")}
            isSelected={selected["group-2"] === "selector-4"}
          />
        </Stack>
      </StepperInpageStep>
    </StepperInpage>
  </ShopSection>
  <Visible below="laptop">
    <StickyBar
      hideWhenVisibleRef={shoppingCartRef}
      modal={{
        trigger: <StickyBarActionButton position="bottom" onClick={() => {}} />,
        title: "Modal title",
        children: <Paragraph>Modal child</Paragraph>,
      }}
      layout={{ mobileSmall: "stacked", tablet: "default" }}
      position="bottom"
      callToAction={
        <Button prominence="emphasised" fill={{ mobileSmall: true, tablet: false }}>
          Button
        </Button>
      }
    >
      <Stack key="monthly" gap={0}>
        <Paragraph>Per maand</Paragraph>
        <Paragraph>€ 10,00</Paragraph>
      </Stack>
      <Stack key="one-off" gap={0}>
        <Paragraph>Eenmalig</Paragraph>
        <Paragraph>€ 15,00</Paragraph>
      </Stack>
    </StickyBar>
  </Visible>
  </>);`;

export default function ExampleShopPdpPage() {
  const [selected, setSelected] = useState<{ [groupName: string]: string }>({
    "group-1": "selector-1",
    "group-2": "selector-3",
  });

  const shoppingcartRef = useRef(null);

  const onChangeHandler = (groupName: string, id: string) => {
    setSelected((prev) => ({
      ...prev,
      [groupName]: id,
    }));
  };

  return (
    <>
      <BaseLayout
        title="Shop PDP example"
        hideWhenVisibleRef={shoppingcartRef}
        code={code}
      >
        <ProductHero
          image={{
            src: "https://a.storyblok.com/f/182771/872x480/c642b88453/klik-klaar.png",
            alt: "Alt text",
          }}
          largeSticker={
            <LargeSticker
              list={
                <DefaultList
                  inverted
                  items={[{ icon: "checkmark", text: "Klik en klaar" }]}
                  size="default"
                  variant="icon"
                />
              }
              type="usp"
            />
          }
          status={<Status type="success" statusText="Status" />}
        />
        <StepperInpage>
          <StepperInpageStep title="Ontdek je korting">
            <Stack alignItems="stretch">
              <Paragraph>
                Is er ook een ander abonnement van Odido of Ben op je adres?
              </Paragraph>
              <Stack
                direction={{ mobileSmall: "column", tablet: "row" }}
                alignItems="stretch"
              >
                <Selector
                  id="selector-1"
                  name="group-1"
                  title="Selector 1"
                  onChange={() => onChangeHandler("group-1", "selector-1")}
                  isSelected={selected["group-1"] === "selector-1"}
                />
                <Selector
                  id="selector-2"
                  name="group-1"
                  title="Selector 2"
                  onChange={() => onChangeHandler("group-1", "selector-2")}
                  isSelected={selected["group-1"] === "selector-2"}
                />
              </Stack>
              <Callout
                title="Dit zijn de klantvoordelen"
                status="success"
                content="alternate"
              >
                <DefaultList
                  items={[
                    { text: "Elke maand € 5,00 korting op je Internet" },
                    {
                      text: "Tot € 7,50 korting per maand op Unlimited abonnementen",
                    },
                    {
                      text: "Elke maand dubbele data en € 2,50 korting op andere abonnementen van Odido",
                    },
                    {
                      text: "Tot 5 GB extra data per maand op Ben abonnement met internet bundel",
                    },
                  ]}
                />
              </Callout>
            </Stack>
          </StepperInpageStep>
          <StepperInpageStep title="Looptijd">
            <Stack
              direction={{ mobileSmall: "column", tablet: "row" }}
              alignItems="stretch"
            >
              <Selector
                id="selector-3"
                name="group-2"
                title="Selector 3"
                onChange={() => onChangeHandler("group-2", "selector-3")}
                isSelected={selected["group-2"] === "selector-3"}
              />
              <Selector
                id="selector-4"
                name="group-2"
                title="Selector 4"
                onChange={() => onChangeHandler("group-2", "selector-4")}
                isSelected={selected["group-2"] === "selector-4"}
              />
            </Stack>
          </StepperInpageStep>
        </StepperInpage>
      </BaseLayout>
      <Visible below="laptop">
        <ClientStickyBar hideWhenVisibleRef={shoppingcartRef} />
      </Visible>
    </>
  );
}
