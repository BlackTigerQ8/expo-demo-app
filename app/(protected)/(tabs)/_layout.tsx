import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "users") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "menu") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          }

          return (
            <Ionicons
              name={iconName}
              color={color}
              size={size}
              style={{ opacity: focused ? 1 : 0.5 }}
            />
          );
        },
        tabBarActiveTintColor: "#ff8800",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "users",
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "menu",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
