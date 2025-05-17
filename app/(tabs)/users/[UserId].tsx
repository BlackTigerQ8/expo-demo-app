import { users } from "@/app/data/users";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const UserProfile = () => {
  const { UserId } = useLocalSearchParams();
  const user = users.find((user) => user.id === UserId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header/Profile Section */}
      <View style={styles.header}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{user.accessLevel}</Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="key-outline" size={20} color="#666" />
            <Text style={styles.infoText}>ID: {user.id}</Text>
          </View>
        </View>
      </View>

      {/* Role & Permissions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Role & Permissions</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="shield-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              Access Level: {user.accessLevel}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  badgeContainer: {
    backgroundColor: "#ff8800",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginTop: 5,
  },
  badge: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoText: {
    fontSize: 16,
    color: "#444",
    marginLeft: 10,
  },
  errorText: {
    fontSize: 18,
    color: "#ff3b30",
    textAlign: "center",
    marginTop: 50,
  },
});
