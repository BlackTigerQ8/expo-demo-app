import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
        }}
      />
      <Stack.Screen
        name="Create"
        options={{
          title: "Add New Meal",
        }}
      />
    </Stack>
  );
};

export default _layout;
