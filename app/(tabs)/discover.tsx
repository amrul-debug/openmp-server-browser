import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from '@/components/PageHeader';
import { FeaturedServer } from '@/components/FeaturedServer';
import { CategoryCard } from '@/components/CategoryCard';
import Colors from '@/constants/Colors';
import { useServers } from '@/hooks/useServers';

export default function DiscoverScreen() {
  const { servers, isLoading } = useServers();
  
  const featuredServer = servers && servers.length > 0
    ? servers[Math.floor(Math.random() * servers.length)]
    : null;
  
  const getCategoryCount = (category: string) => {
    if (!servers) return 0;
    
    switch(category) {
      case 'roleplay':
        return servers.filter(s => s.gm.toLowerCase().includes('rp')).length;
      case 'deathmatch':
        return servers.filter(s => s.gm.toLowerCase().includes('dm')).length;
      case 'stunt':
        return servers.filter(s => s.gm.toLowerCase().includes('stunt')).length;
      case 'race':
        return servers.filter(s => s.gm.toLowerCase().includes('race')).length;
      case 'freeroam':
        return servers.filter(s => s.gm.toLowerCase().includes('freeroam')).length;
      default:
        return 0;
    }
  };
  
  const categories = [
    { id: 'roleplay', name: 'Roleplay', count: getCategoryCount('roleplay'), icon: 'user-circle' },
    { id: 'deathmatch', name: 'Deathmatch', count: getCategoryCount('deathmatch'), icon: 'target' },
    { id: 'stunt', name: 'Stunt', count: getCategoryCount('stunt'), icon: 'car' },
    { id: 'race', name: 'Racing', count: getCategoryCount('race'), icon: 'flag' },
    { id: 'freeroam', name: 'Freeroam', count: getCategoryCount('freeroam'), icon: 'map' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader title="Discover" subtitle="Find new servers to play" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Featured Server</Text>
        {featuredServer && <FeaturedServer server={featuredServer} />}
        
        <Text style={styles.sectionTitle}>Browse Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              name={category.name}
              count={category.count}
              icon={category.icon}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});