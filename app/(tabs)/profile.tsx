import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user';
import { Award, MapPin, Clock, Settings, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user } = useUserStore();
  
  if (!user) return null;
  
  const badges = [
    { id: 1, name: 'First Reporter', description: 'Posted your first update', icon: 'award' },
    { id: 2, name: 'Busy Spotter', description: 'Reported 5 busy locations', icon: 'eye' },
    { id: 3, name: 'Helpful Guide', description: 'Received 10 upvotes', icon: 'thumbs-up' },
  ];
  
  const stats = [
    { id: 1, label: 'Updates', value: user.updateCount, icon: <Clock size={20} color={colors.primary} /> },
    { id: 2, label: 'Points', value: user.points, icon: <Award size={20} color={colors.primary} /> },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color={colors.textSecondary} />
            <Text style={styles.location}>Evanston, IL</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          {stats.map(stat => (
            <View key={stat.id} style={styles.statItem}>
              {stat.icon}
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgesContainer}>
          {badges.map(badge => (
            <View key={badge.id} style={styles.badgeItem}>
              <View style={styles.badgeIcon}>
                <Award size={24} color={colors.primary} />
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingItem}>
            <Settings size={20} color={colors.text} />
            <Text style={styles.settingText}>App Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <LogOut size={20} color={colors.text} />
            <Text style={styles.settingText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '600',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeIcon: {
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  settingsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  settingText: {
    fontSize: 16,
  },
});