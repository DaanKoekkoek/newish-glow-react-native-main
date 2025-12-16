import {
  Main,
  Section,
  Grid,
  Paragraph,
  Footer,
} from "@odido-portals/glow-react-native";
import React from "react";

export function FooterScreen() {
  return (
    <Main
      footerComponent={
        <Footer>
          <Footer.Breadcrumbs>
            <Paragraph size="sm">Initial</Paragraph>
            <Footer.Link href="#">Footer.Link</Footer.Link>
          </Footer.Breadcrumbs>
          <Footer.Top>
            <Footer.Grid>
              <Footer.Grid.Column title="prop: title" collapsible>
                <Footer.Link href="#">Footer.Link</Footer.Link>
                <Footer.Link href="#">Footer.Link</Footer.Link>
              </Footer.Grid.Column>
              <Footer.Grid.Column title="prop: title" collapsible>
                <Footer.Link href="#">Footer.Link</Footer.Link>
                <Footer.Link href="#">Footer.Link</Footer.Link>
              </Footer.Grid.Column>
              <Footer.Grid.Column title="prop: title" collapsible>
                <Footer.Link href="#">Footer.Link</Footer.Link>
                <Footer.Link href="#">Footer.Link</Footer.Link>
              </Footer.Grid.Column>
              <Footer.Grid.Column title="prop: title" collapsible>
                <Footer.Link href="#">Footer.Link</Footer.Link>
                <Footer.Link href="#">Footer.Link</Footer.Link>
              </Footer.Grid.Column>
            </Footer.Grid>
          </Footer.Top>
          <Footer.Bottom copyright="prop: copyright">
            <Footer.Grid>
              <Footer.Grid.Column>
                <Footer.Logo />
              </Footer.Grid.Column>
              <Footer.Grid.Column>
                <Footer.Socials>
                  <Footer.Link href="#">
                    <Footer.Icon name="x" />
                  </Footer.Link>
                  <Footer.Link href="#">
                    <Footer.Icon name="facebook" />
                  </Footer.Link>
                  <Footer.Link href="#">
                    <Footer.Icon name="linkedin" />
                  </Footer.Link>
                  <Footer.Link href="#">
                    <Footer.Icon name="chat" />
                  </Footer.Link>
                </Footer.Socials>
              </Footer.Grid.Column>
              <Footer.Grid.Column>
                <Footer.AppStores>
                  <Footer.Link href="#">
                    <Footer.AppStore brand="Apple" />
                  </Footer.Link>
                  <Footer.Link href="#">
                    <Footer.AppStore brand="Google" />
                  </Footer.Link>
                </Footer.AppStores>
              </Footer.Grid.Column>
            </Footer.Grid>
            <Footer.Assorted>
              <Footer.Link href="#">Assorted link</Footer.Link>
              <Footer.Link href="#">Assorted link</Footer.Link>
              <Footer.Link href="#">Assorted link</Footer.Link>
            </Footer.Assorted>
          </Footer.Bottom>
        </Footer>
      }
    >
      <Section paddingBottom="none" paddingTop="none">
        <Grid>
          <Grid.Column />
        </Grid>
      </Section>
    </Main>
  );
}
