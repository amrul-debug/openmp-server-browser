import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from '@/components/PageHeader';
import { ServersList } from '@/components/ServersList';
import { useServers } from '@/hooks/useServers';
import { useFavorites } from '@/hooks/useFavorites';
import Colors from '@/constants/Colors';
import { EmptyState } from '@/components/EmptyState';

export default function FavoritesScreen() {
  const { servers, isLoading } = useServers();
  const { favorites } = useFavorites();
  
  const favoriteServers = servers?.filter(server => 
    favorites.includes(`${server.ip}`)
  ) || [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader title="Favorites" subtitle="Your saved servers" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {favoriteServers.length > 0 ? (
          <ServersList servers={favoriteServers} isLoading={isLoading} />
        ) : (
          <EmptyState 
            title="No favorites yet"
            message="Add servers to your favorites to quickly access them later"
            icon="star"
          />
        )}
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
    flexGrow: 1,
  },
});