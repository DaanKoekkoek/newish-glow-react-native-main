import "./App.css";

import { useState } from "react";
import { TabOptionArray } from "components/SegmentedTab/SegmentedTab.types";
import { DefaultList } from "components/DefaultList/DefaultList";
import { Theme, ThemeProvider } from "components/ThemeProvider";
import { Icon } from "foundations/Icon";
import { BaseButton } from "components/Button";
import { SegmentedTab } from "components/SegmentedTab";

const tabs = [
  {
    id: 0,
    tab: {
      label: "Home",
      icon: "home" as const,
    },
    panel: "Welcome to the Home tab!",
  },
  {
    id: 1,
    tab: {
      label: "Profile",
      icon: "profile" as const,
    },
    panel: "This is your Profile information.",
  },
  {
    id: 2,
    tab: {
      label: "Settings",
      icon: "settings" as const,
    },
    panel: "Here you can change Settings.",
  },
] as TabOptionArray;

const App = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="playground">
      <ThemeProvider brand="odido" theme={theme}>
        <Icon name="airplane" size="lg" />
        <br />
        <BaseButton onClick={() => switchTheme()}>
          {`Swich theme: ${theme}`}
        </BaseButton>
        <br />
        <SegmentedTab
          options={tabs}
          active={0}
          onTabChange={(index) => console.log(`Tab changed to: ${index + 1}`)}
        />
        <DefaultList
          color="default"
          variant="icon"
          palette="orange"
          items={[
            { text: "Item 1" },
            { text: "Item 2" },
            { text: "Item 3" },
            { text: "Item 4" },
            { text: "Item 5" },
          ]}
        />
      </ThemeProvider>
    </div>
  );
};

export default App;
