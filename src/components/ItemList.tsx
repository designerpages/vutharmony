import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import LoadingScreen from "./LoadingScreen";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import { fetchItems, deleteItem, Item } from "../redux/slices/itemsSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

type ItemListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ItemList"
>;

interface ItemListProps {
  navigation: ItemListNavigationProp;
}

const ItemList: React.FC<ItemListProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <View style={{ width: "80%" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ItemDetail", { itemId: item.id })}
        >
          <Text style={styles.itemTitle}>{item.title}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  if (status === "failed") {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Create New Item"
        onPress={() => navigation.navigate("CreateItem")}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button
        title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
        onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      />
      <FlatList
        data={sortedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemTitle: {
    fontSize: 16,
    flex: 1,
  },
  searchInput: {
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ItemList;
