import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type UserCardProps = {
  id: string;
  name: string;
  accessLevel: string;
  email: string;
  imageUrl: string;
  onPress?: () => void;
};

export default function UserCard({
  id,
  name,
  email,
  imageUrl,
  accessLevel,
  onPress,
}: UserCardProps) {
  return (
    <Link href={`/users/${id}`} asChild>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.accessLevel}>{accessLevel}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 15,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  accessLevel: {
    fontSize: 12,
    color: "#ff8800",
  },
});
