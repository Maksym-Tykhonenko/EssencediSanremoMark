// Tips.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Share,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Массив из 20 советов
const tipsData = [
  {
    title: 'Visit the Sanremo Music Festival',
    description:
      "If you're in town during February, don't miss the iconic Sanremo Music Festival. It's a must-see for any music lover.",
  },
  {
    title: 'Explore the Old Town (La Pigna)',
    description:
      'Wander through the narrow streets of La Pigna, the historical heart of Sanremo, to experience its charm and medieval architecture.',
  },
  {
    title: 'Take a stroll along the Lungomare',
    description:
      'The Lungomare is a beautiful promenade that stretches along the coast, perfect for a relaxing walk with stunning sea views.',
  },
  {
    title: 'Try the Local Cuisine',
    description:
      'Sanremo is famous for its Ligurian cuisine. Be sure to try "troffie al pesto," "focaccia," and local seafood dishes.',
  },
  {
    title: 'Visit the Russian Orthodox Church',
    description:
      'A symbol of Sanremo’s ties with Russia, the Church is a peaceful and historic place to visit.',
  },
  {
    title: 'Go to the Casino di Sanremo',
    description:
      'The Sanremo Casino is not only a place for gambling but also an architectural gem with its Belle Époque style. You can also enjoy various performances here.',
  },
  {
    title: 'Rent a Bike',
    description:
      'Sanremo is a bike-friendly city, and cycling along the coastal roads offers beautiful views. You can also cycle through the surrounding hills for a more adventurous experience.',
  },
  {
    title: 'Check Out the Local Markets',
    description:
      'Visit the daily market at Piazza Eroi Sanremesi for fresh local produce and artisan goods. It’s a great place to experience local life.',
  },
  {
    title: 'Visit Villa Nobel',
    description:
      'This historic villa was the home of Alfred Nobel and now houses a museum dedicated to his life and achievements.',
  },
  {
    title: 'Go for a Hike in the Surrounding Hills',
    description:
      'Take advantage of Sanremo’s location in the hills with scenic hiking trails that offer panoramic views of the Mediterranean.',
  },
  {
    title: 'Take a Boat Tour',
    description:
      'Explore the Ligurian coastline by boat. You can rent a private boat or join a guided tour for an unforgettable view of the area.',
  },
  {
    title: 'Spend a Day at the Beach',
    description:
      'Sanremo has beautiful beaches, including the popular Baia Verde, perfect for relaxing in the sun.',
  },
  {
    title: 'Visit the Civic Museum',
    description:
      'Discover Sanremo’s history and culture at the Civic Museum, which offers a variety of exhibits from archaeology to fine arts.',
  },
  {
    title: 'Explore the Italian Riviera',
    description:
      'Sanremo is part of the Italian Riviera, a stunning stretch of coastline. Take a day trip to explore nearby towns like Imperia or Dolceacqua.',
  },
  {
    title: 'Learn About Sanremo’s Flowers',
    description:
      'Known as the "City of Flowers," Sanremo is famous for its flower markets and displays. Don’t miss a visit to the Sanremo Flower Market.',
  },
  {
    title: 'Take a Day Trip to Monaco',
    description:
      'Sanremo is only about an hour’s drive from Monaco, making it easy to explore the luxury and glamour of this tiny principality.',
  },
  {
    title: 'Check Out the Annual Sanremo Rally',
    description:
      'For car enthusiasts, the Sanremo Rally is a thrilling event that showcases some of the best cars in the world.',
  },
  {
    title: 'Experience Sanremo’s Vibrant Nightlife',
    description:
      'Enjoy the lively atmosphere in Sanremo’s bars, clubs, and cafes. The town offers a wide variety of spots to relax or dance the night away.',
  },
  {
    title: 'Take a Cooking Class',
    description:
      'Learn how to cook traditional Ligurian dishes by taking a cooking class. It’s a great way to bring a piece of Sanremo home with you.',
  },
  {
    title: 'Learn the Local Dialect',
    description:
      'While Italian is widely spoken, learning a few words in the local Ligurian dialect can enhance your experience and help you connect with the locals.',
  },
];

export default function Tips() {
  // Функция для шаринга совета
  const handleShare = tip => {
    const message = `Sanremo Tip: ${tip.title}\n\n${tip.description}`;
    Share.share({message});
  };

  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/new/bg.png')}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Шапка */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/head.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.goldLine} />

        {/* Заголовок */}
        <Text style={styles.mainHeader}>Sanremo visitor Tips:</Text>

        {/* Список советов */}
        {tipsData.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <Image
              source={require('../assets/tips1.png')}
              style={[styles.iconImage, {tintColor: '#FFC243'}]}
            />
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDesc}>{tip.description}</Text>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShare(tip)}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 20,
    padding: 10,
    height: 100,
  },
  goldLine: {
    height: 2,
    backgroundColor: '#B29049',
    width: '100%',
    marginBottom: 10,
  },
  mainHeader: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
    fontFamily: 'InknutAntiqua-Medium',
  },
  // Карточка совета
  tipCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#010101',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    padding: 16,
  },
  tipTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'InknutAntiqua-Medium',
  },
  tipDesc: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: '#FFC243',
    alignSelf: 'flex-start',
    paddingHorizontal: 40,
    paddingVertical: 2,
    borderRadius: 4,
  },
  shareButtonText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'InknutAntiqua-Medium',
  },
});
