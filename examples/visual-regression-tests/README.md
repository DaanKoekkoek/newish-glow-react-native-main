# Glow React Native

# Usage

1. Build the test project to create a prebuild (for Android):

   ```
   pnpm run vrt:android-build
   ```

2. Run tests with:
   ```
   pnpm run vrt:android-test
   ```
   In case you have changes, and want to update the new baseline screenshots run
   ```
   pnpm run vrt:android-update
   ```

# Add a new test

1. Create a directory for your component in the tests/directory

2. Add a new owl test, like `Button.owl.tsx`, and a screen file, where we will showcase the component created `Button.screen.tsx`.

3. If the component is new to be able to import it from from `@odido-portals/glow-react-native` you will first have to run `pnpm run build` within `@odido-portals/glow-react-native`.

4. Add a new link to your component screen in App.tsx
   ```js
   function App() {
     return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
           <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="ButtonDemo" component={ButtonDemoScreen} />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
   ```
5. Run the tests to generate some new baseline screenshots

# Update a component/test

1. Run the test command `pnpm run vrt:android-test`
2. If there are regressions and are expected, run the command to update the baselines `pnpm run vrt:android-update`
