import React from "react";
import { Text } from "react-native";

import { Box, InputField, TextLink, Button } from "components/index";
import {
  Main,
  Section,
  Grid,
  Stack,
  Heading,
  Paragraph,
} from "foundations/index";
// import { Platform, Alert } from "react-native";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

export interface LoginScreenProps {
  title?: string;
  description?: string;
}

// const UserSchema = z.object({
//   email: z.string().email({ message: "Ongeldige email" }),
//   password: z.string().min(1, { message: "Ongeldige wachtwoord" }),
// });

// type UserSchemaType = z.infer<typeof UserSchema>;

export function LoginScreen({ title, description }: LoginScreenProps) {
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UserSchemaType>({
  //   mode: "onBlur",
  //   reValidateMode: "onChange",
  //   resolver: zodResolver(UserSchema),
  // });

  // const onSubmit = (data: UserSchemaType) => {
  //   if (Platform.OS === "web") {
  //     alert(JSON.stringify(data));
  //   } else {
  //     Alert.alert(JSON.stringify(data));
  //   }
  // };

  return (
    <Main>
      <Section>
        <Grid variant="narrow" laptop={6}>
          <Grid.Column>
            <Stack>
              <Box prominence="emphasised">
                <Stack gap="sm">
                  <Heading size="xl" as="h1">
                    {title}
                  </Heading>
                  <Paragraph size="sm">{description}</Paragraph>
                </Stack>
              </Box>
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Box prominence="outline">
              <Stack alignItems="stretch">
                <Stack gap="sm" alignItems="stretch">
                  <Stack gap="sm" alignItems="stretch">
                    <InputField
                      placeholder="E-mailadres"
                      label={{ text: "E-mailadres" }}
                    />
                    <InputField
                      type="password"
                      placeholder="Wachtwoord"
                      label={{ text: "Wachtwoord" }}
                    />
                    {/* <Controller
                            name="email"
                            control={control}
                            rules={{
                              validate: async (value) => {
                                try {
                                  await UserSchema.parseAsync({
                                    email: value,
                                  });
                                  return true;
                                } catch (error: any) {
                                  return error.message;
                                }
                              },
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <InputField
                                placeholder="E-mailadres"
                                errorMessage={errors.email?.message}
                                label="E-mailadres"
                                onBlur={onBlur}
                                value={value}
                                onChange={({ nativeEvent: { text } }) => {
                                  onChange(text);
                                }}
                              />
                            )}
                          />
                          <Controller
                            name="password"
                            control={control}
                            rules={{
                              validate: async (value) => {
                                try {
                                  await UserSchema.parseAsync({
                                    password: value,
                                  });
                                  return true;
                                } catch (error: any) {
                                  return error.message;
                                }
                              },
                            }}
                            render={({ field: { onChange, onBlur } }) => {
                              return (
                                <InputField
                                  type="password"
                                  placeholder="Wachtwoord"
                                  errorMessage={errors.password?.message}
                                  label="Wachtwoord"
                                  onBlur={onBlur}
                                  onChangeText={onChange}
                                  enterKeyHint="done"
                                />
                              );
                            }}
                          /> */}
                  </Stack>
                  <Stack alignItems="flex-end">
                    <TextLink size="sm" href="/wachtwoord-vergeten">
                      Inloggegevens vergeten
                    </TextLink>
                  </Stack>
                </Stack>
                <Stack gap="sm">
                  {/* handleSubmit(onSubmit) */}
                  <Button fill onPress={() => {}}>
                    <Text>Inloggen</Text>
                  </Button>
                  <Button fill prominence="secondary" onPress={() => {}}>
                    <Text>Account aanmaken</Text>
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
