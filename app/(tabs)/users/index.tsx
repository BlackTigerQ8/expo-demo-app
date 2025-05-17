import CustomButton from "@/app/CustomButton";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import UserCard from "../../components/UserCard";
import { users } from "../../data/users";

export default function UsersScreen() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const accessLevels = ["admin", "user", "manager"];

  const filteredUsers =
    selectedLevel === "all"
      ? users
      : users.filter((user) => user.accessLevel === selectedLevel);

  return (
    <View style={styles.container}>
      {/* Add User Button */}
      <View style={styles.buttonContainer}>
        <CustomButton text="Add User" onPress={() => {}} />
      </View>

      {/* Access Level Filters */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedLevel === "all" && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedLevel("all")}
        >
          <Text
            style={[
              styles.filterText,
              selectedLevel === "all" && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {accessLevels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.filterButton,
              selectedLevel === level && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedLevel(level)}
          >
            <Text
              style={[
                styles.filterText,
                selectedLevel === level && styles.filterTextActive,
              ]}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Users List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            id={item.id}
            name={item.name}
            email={item.email}
            imageUrl={item.imageUrl}
            accessLevel={item.accessLevel}
            onPress={() => {
              console.log("User pressed:", item.name);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    marginTop: 50,
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtonActive: {
    backgroundColor: "#ff8800",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
