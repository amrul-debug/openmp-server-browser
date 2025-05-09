import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServersList } from '@/components/ServersList';
import { SearchFilter } from '@/components/SearchFilter';
import { PageHeader } from '@/components/PageHeader';
import { useServers } from '@/hooks/useServers';
import Colors from '@/constants/Colors';

export default function ServersScreen() {
  const { servers, isLoading, isError, mutate } = useServers();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredServers = servers?.filter(server => {
    //filter search query
    const matchesQuery = server.hn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        server.gm.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        server.la.toLowerCase().includes(searchQuery.toLowerCase());
    
    //category filter
    if (activeFilter === 'all') return matchesQuery;
    if (activeFilter === 'roleplay') return matchesQuery && server.gm.toLowerCase().includes('rp');
    if (activeFilter === 'deathmatch') return matchesQuery && server.gm.toLowerCase().includes('dm');
    if (activeFilter === 'stunt') return matchesQuery && server.gm.toLowerCase().includes('stunt');
    if (activeFilter === 'passworded') return matchesQuery && server.pa;
    
    return matchesQuery;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader title="Server Browser" subtitle={`${servers ? servers.length : 0} Servers Online`} />
      
      <SearchFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      {isError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load servers</Text>
          <Text style={styles.errorSubtext}>Check your connection and try again</Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading} 
              onRefresh={mutate}
              tintColor={Colors.primary[500]}
              colors={[Colors.primary[500]]}
            />
          }
        >
          <ServersList servers={filteredServers || []} isLoading={isLoading} />
        </ScrollView>
      )}
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
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.error[500],
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: Colors.gray[400],
    textAlign: 'center',
  },
});