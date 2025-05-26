import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Clock, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { Update } from '@/types';
import { colors } from '@/constants/colors';
import { formatTimeAgo } from '@/utils/time';
import BusynessIndicator from './BusynessIndicator';

interface UpdateCardProps {
  update: Update;
  onUpvote?: () => void;
  onDownvote?: () => void;
}

export default function UpdateCard({ update, onUpvote, onDownvote }: UpdateCardProps) {
  const isVerified = update.upvotes - update.downvotes >= 3;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {update.userAvatar ? (
            <Image source={{ uri: update.userAvatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{update.userName.charAt(0)}</Text>
            </View>
          )}
          <Text style={styles.userName}>{update.userName}</Text>
          {isVerified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>
        <View style={styles.timeInfo}>
          <Clock size={14} color={colors.textSecondary} />
          <Text style={styles.timestamp}>{formatTimeAgo(update.timestamp)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <BusynessIndicator level={update.busynessLevel} size="medium" />
        
        {update.waitTime !== undefined && update.waitTime > 0 && (
          <Text style={styles.waitTime}>
            {update.waitTime} min wait time
          </Text>
        )}
        
        {update.note && (
          <Text style={styles.note}>{update.note}</Text>
        )}
        
        {update.photoUrl && (
          <Image source={{ uri: update.photoUrl }} style={styles.photo} />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.voteButton, 
            update.hasVoted === 'up' && styles.votedButton
          ]} 
          onPress={onUpvote}
          activeOpacity={0.7}
        >
          <ThumbsUp 
            size={16} 
            color={update.hasVoted === 'up' ? colors.primary : colors.textSecondary} 
          />
          <Text 
            style={[
              styles.voteCount, 
              update.hasVoted === 'up' && styles.votedText
            ]}
          >
            {update.upvotes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.voteButton, 
            update.hasVoted === 'down' && styles.votedButton
          ]} 
          onPress={onDownvote}
          activeOpacity={0.7}
        >
          <ThumbsDown 
            size={16} 
            color={update.hasVoted === 'down' ? colors.error : colors.textSecondary} 
          />
          <Text 
            style={[
              styles.voteCount, 
              update.hasVoted === 'down' && { color: colors.error }
            ]}
          >
            {update.downvotes}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  userName: {
    fontWeight: '500',
    fontSize: 14,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  content: {
    gap: 8,
  },
  waitTime: {
    fontSize: 14,
    color: colors.text,
  },
  note: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  photo: {
    height: 180,
    borderRadius: 8,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  votedButton: {
    backgroundColor: colors.card,
  },
  voteCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  votedText: {
    color: colors.primary,
  },
  verifiedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 6,
  },
  verifiedText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
});