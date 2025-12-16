# Storybook

This is a semi custom storybook setup. its a combination of storybook/react-native and the standard (web) storybook. since we want to publish the standard storybook as documentation for our component system.

Due to the combination we are locked into using the highest version of storybook supported by both configurations. at the time of writing that is v7.6 due to [storybook/react-native](https://github.com/storybookjs/react-native) not yet supporting storybook [v8](https://github.com/storybookjs/react-native/pull/538)

[This](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/get-started/) tutorial describes the basic setup quite well, making use of [this](https://github.com/chromaui/intro-storybook-react-native-template/tree/main) template.

[This](https://medium.com/@dannyhyunsoowilliams/react-native-and-react-native-web-storybook-together-53a18cf7d711) blog post by one of the main contributors explains how one can setup a combined setup like ours (though its unclear if that was the initial approach on this repo as I (J) wasn't around.).

### Setup

This is a slightly more complex setup because it requires you to have two sets of storybook config and scripts. However those tradeoffs give you the ability to use all the features of web storybook and tooling that comes with it.

- `.storybook/` contains the normal storybook web's configuration, this uses webpack as a bundler

- `.storybook-rn/` contains the storybook react-native configuration, this uses metro as a bundler

## Context
