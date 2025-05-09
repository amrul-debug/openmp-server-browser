import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ServerCard } from './ServerCard';
import Colors from '@/constants/Colors';

interface ServersListProps {
  servers: any[];
  isLoading: boolean;
}

export function ServersList({ servers, isLoading }: ServersListProps) {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
        <Text style={styles.loadingText}>Loading servers...</Text>
      </View>
    );
  }

  if (servers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No servers found</Text>
        <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {servers.map((server, index) => (
        <ServerCard key={`${server.ip}-${index}`} server={server} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
  },
});