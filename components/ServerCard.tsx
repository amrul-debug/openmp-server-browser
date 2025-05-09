import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Users, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFavorites } from '@/hooks/useFavorites';
import Colors from '@/constants/Colors';

interface Server {
  ip: string;
  hn: string;
  pc: number;
  pm: number;
  gm: string;
  la: string;
  pa: boolean;
  vn: string;
  omp: boolean;
  pr: boolean;
}

interface ServerCardProps {
  server: Server;
}

export function ServerCard({ server }: ServerCardProps) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(server.ip);

  const handlePress = () => {
    router.push(`/server/${encodeURIComponent(server.ip)}`);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(server.ip);
  };

  const playerPercentage = server.pm > 0 ? (server.pc / server.pm) * 100 : 0;
  
  let statusColor = Colors.success[500];
  if (playerPercentage >= 80) {
    statusColor = Colors.error[500];
  } else if (playerPercentage >= 50) {
    statusColor = Colors.warning[500];
  }

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.cardHeader}>
        <Text style={styles.serverName} numberOfLines={1}>
          {server.hn}
        </Text>
        <Pressable 
          style={styles.favoriteButton} 
          onPress={handleFavoritePress}
          hitSlop={8}
        >
          <Star 
            size={18} 
            color={favorite ? Colors.warning[400] : Colors.gray[500]} 
            fill={favorite ? Colors.warning[400] : 'transparent'} 
          />
        </Pressable>
      </View>
      
      <Text style={styles.gameMode} numberOfLines={1}>{server.gm}</Text>
      
      <View style={styles.footer}>
        <View style={styles.playerContainer}>
          <Users size={14} color={Colors.gray[400]} />
          <Text style={styles.playerText}>
            {server.pc}/{server.pm}
          </Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar,
              { width: `${playerPercentage}%`, backgroundColor: statusColor }
            ]} 
          />
        </View>
        
        <Text style={styles.language}>{server.la}</Text>
      </View>
      
      {server.pa && (
        <View style={styles.passwordBadge}>
          <Text style={styles.passwordText}>PW</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gray[800],
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  serverName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  gameMode: {
    fontSize: 14,
    color: Colors.gray[400],
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerText: {
    fontSize: 12,
    color: Colors.gray[400],
    marginLeft: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: Colors.gray[800],
    borderRadius: 2,
    flex: 1,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  language: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  passwordBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.warning[600],
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  passwordText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.black,
  }
});