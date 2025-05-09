import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { Search } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function SearchFilter({ 
  searchQuery, 
  setSearchQuery, 
  activeFilter, 
  setActiveFilter 
}: SearchFilterProps) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'roleplay', label: 'Roleplay' },
    { id: 'deathmatch', label: 'Deathmatch' },
    { id: 'stunt', label: 'Stunt' },
    { id: 'passworded', label: 'Passworded' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.gray[400]} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search servers..."
          placeholderTextColor={Colors.gray[500]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScrollView}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map(filter => (
          <Pressable
            key={filter.id}
            style={[
              styles.filterChip,
              activeFilter === filter.id && styles.activeFilterChip
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text 
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText
              ]}
            >
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[800],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: Colors.text,
    marginLeft: 8,
    fontSize: 14,
  },
  filtersScrollView: {
    flexGrow: 0,
  },
  filtersContainer: {
    paddingRight: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.gray[800],
  },
  activeFilterChip: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[600],
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.gray[400],
  },
  activeFilterText: {
    color: Colors.white,
  },
});