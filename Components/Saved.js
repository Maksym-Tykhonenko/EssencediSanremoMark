import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Linking,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SavedContext} from '../SavedContext';

export default function Saved() {
  const {savedSpots, toggleSavedSpot} = useContext(SavedContext);

  // Функция "Open on maps"
  const handleOpenOnMaps = spot => {
    const url =
      'https://maps.google.com?q=' + encodeURIComponent(spot.coordinates);
    Linking.openURL(url);
  };

  // Функция "Share"
  const handleShare = spot => {
    const message = `Check this spot: ${spot.name}\n${spot.description}`;
    Share.share({message});
  };

  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/new/bg.png')}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/head.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.goldLine} />
      <Text style={styles.SpotHeader}>Saved Spots</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {savedSpots.length === 0 && (
          <Text style={styles.noSpotsText}>No saved spots yet.</Text>
        )}

        {savedSpots.map((spot, index) => (
          <View key={index} style={styles.spotCard}>
            <ImageBackground
              source={spot.image}
              style={styles.spotBg}
              imageStyle={styles.spotBgImage}>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9999)']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 0.65}}
                style={styles.gradientOverlay}>
                <View style={styles.spotContent}>
                  <Text style={styles.spotTitle}>{spot.name}</Text>
                  <Text style={styles.spotDesc}>{spot.description}</Text>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.buttonSmall}
                      onPress={() => handleOpenOnMaps(spot)}>
                      <Text style={styles.buttonSmallText}>Open on maps</Text>
                    </TouchableOpacity>

                    {/* Кнопка "Saved" — объект уже сохранён, поэтому фон жёлтый */}
                    <TouchableOpacity
                      style={[styles.iconButton, {backgroundColor: '#FFC243'}]}
                      onPress={() => toggleSavedSpot(spot)}>
                      <Image
                        source={require('../assets/saved.png')}
                        style={[styles.iconImage, {tintColor: '#FFFFFF'}]}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleShare(spot)}>
                      <Image
                        source={require('../assets/bookmark.png')}
                        style={styles.iconImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  SpotHeader: {
    fontSize: 23,
    marginTop: -10,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 20,
    fontFamily: 'InknutAntiqua-Medium',
    right: 10,
    alignSelf: 'center',
  },
  headerImageContainer: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
  headerImage: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 20,
    padding: 10,
    height: 100,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goldLine: {
    height: 2,
    backgroundColor: '#B29049',
    width: '100%',
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  noSpotsText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'InknutAntiqua-Medium',
  },
  spotCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  spotBg: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  spotBgImage: {
    resizeMode: 'cover',
  },
  spotGradient: {
    padding: 12,
    justifyContent: 'flex-end',
  },
  spotContent: {
    padding: 10,
  },
  spotTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'InknutAntiqua-Medium',
  },
  spotDesc: {
    color: '#FFF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSmall: {
    backgroundColor: '#FFC243',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 1,
    marginRight: 90,
  },
  buttonSmallText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'InknutAntiqua-Medium',
  },
  iconButton: {
    backgroundColor: '#191919',
    borderWidth: 1,
    borderColor: '#FFF',
    width: 36,
    height: 36,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
