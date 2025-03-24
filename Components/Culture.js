// Culture.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const articles = [
  {
    title:
      "The Evolution of Sanremo's Music Scene: From the Sanremo Music Festival to Modern Day",
    shortDescription:
      'Sanremo has long been known for its iconic music festival, but its musical roots go much deeper than the annual event...',
    fullText: `Sanremo has long been known for its iconic music festival, but its musical roots go much deeper than the annual event. This article will take readers on a journey through the history of music in Sanremo, starting from its rise as a fashionable resort town in the 19th century. 
The Sanremo Music Festival, established in 1951, remains the highlight of the city's cultural calendar, showcasing Italy's best talents. The article will also explore the modern music scene, including contemporary music festivals, performances, and the lasting legacy of Sanremo in the Italian music industry.`,
    image: require('../assets/blog1.png'),
    readTime: '5  minutes of reading',
  },
  {
    title: 'Sanremo’s Art and Architecture: A Blend of Historical Influences',
    shortDescription:
      'Sanremo’s art and architecture are a reflection of its rich history, shaped by various cultures over the centuries...',
    fullText: `Sanremo’s art and architecture are a reflection of its rich history, shaped by various cultures over the centuries. This article will delve into the influences that have shaped Sanremo’s buildings, from the elegant Belle Époque villas to the unique structures built by Russian aristocrats. Visitors can experience the city’s artistic culture in places like the Civic Museum and Villa Nobel. The article will highlight key architectural landmarks and the art scene in Sanremo, offering insight into the city’s role as both a tourist destination and a hub for cultural exchange.`,
    image: require('../assets/blog2.png'),
    readTime: '5  minutes of reading',
  },
  {
    title: 'A Taste of Sanremo: Exploring Ligurian Cuisine and Local Delights',
    shortDescription:
      'Sanremo’s culinary scene is a celebration of Ligurian cuisine, with fresh seafood, local olive oil, and delicious pesto...',
    fullText: `Sanremo’s culinary scene is a celebration of Ligurian cuisine, with fresh seafood, local olive oil, and delicious pesto taking center stage. This article will explore the unique dishes and local ingredients that define the city’s food culture. Readers will learn about traditional dishes like "troffie al pesto" and "focaccia," as well as the history behind the famous Sanremo olive. The article will also feature some of the best restaurants and cafes in the area, where visitors can experience the flavors of Sanremo firsthand.`,
    image: require('../assets/ph11.png'),
    readTime: '5  minutes of reading',
  },
];

export default function Culture() {
  // selectedArticle хранит статью, которую пользователь читает (или null)
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Обработчик шаринга
  const handleShare = article => {
    // Можно шарить полный текст или заголовок+короткое описание
    const message = `Check out this article: ${article.title}\n\n${article.shortDescription}`;
    Share.share({message});
  }; // Если есть выбранная статья, показываем «экран чтения»
  if (selectedArticle) {
    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/new/bg.png')}>
        <ScrollView style={styles.scrollContainer}>
          {/* Шапка */}
          <View style={styles.headerImageContainer}>
            <Image
              source={require('../assets/head.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.goldLine} />

          <Text style={styles.readingHeader}>Reading:</Text>

          <ImageBackground
            source={selectedArticle.image}
            style={styles.readImageBg}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 10,
            }}></ImageBackground>
          <Text style={styles.readTitle}>{selectedArticle.title}</Text>

          <View style={styles.readContent}>
            <Text style={styles.readFullText}>{selectedArticle.fullText}</Text>
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedArticle(null)}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShare(selectedArticle)}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  // Иначе показываем список статей
  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/new/bg.png')}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Шапка */}
        <View style={styles.headerImageContainer}>
          <Image
            source={require('../assets/head.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.goldLine} />

        <Text style={styles.mainHeader}>Culture di Sanremo:</Text>

        {articles.map((article, index) => (
          <View key={index} style={styles.articleCard}>
            <ImageBackground
              source={article.image}
              style={styles.articleBg}
              imageStyle={styles.articleBgImage}>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9999)']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 0.65}}
                style={styles.gradientOverlay}>
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle} numberOfLines={2}>
                    {article.title}
                  </Text>
                  <Text style={styles.readTime}>{article.readTime}</Text>

                  <Text style={styles.articleShortDesc} numberOfLines={1}>
                    {article.shortDescription}
                  </Text>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.readNowButton}
                      onPress={() => setSelectedArticle(article)}>
                      <Text style={styles.readNowButtonText}>Read Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.shareIconButton}
                      onPress={() => handleShare(article)}>
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
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
    marginVertical: 10,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
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

  // Карточка статьи в списке
  articleCard: {
    marginHorizontal: 12,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  articleBg: {
    width: '100%',
    height: 260,
    justifyContent: 'flex-end',
  },
  articleBgImage: {
    resizeMode: 'cover',
  },
  gradientOverlay: {
    justifyContent: 'flex-end',
  },
  articleContent: {
    paddingHorizontal: 5,
  },

  articleTitle: {
    lineHeight: 27,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: -1,
    fontFamily: 'InknutAntiqua-Medium',
  },
  readTime: {
    color: '#FFF',
    fontSize: 12,
    marginBottom: 6,
  },
  articleShortDesc: {
    color: '#FFF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  actionsRow: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  readNowButton: {
    backgroundColor: '#FFC243',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 1,
    marginRight: 10,
  },
  readNowButtonText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'InknutAntiqua-Medium',
  },
  shareIconButton: {
    backgroundColor: '#191919',
    borderWidth: 1,
    borderColor: '#FFF',
    width: 41,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  readingHeader: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 2,
    fontFamily: 'InknutAntiqua-Medium',
  },
  readImageBg: {
    width: '90%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  readGradient: {
    padding: 12,
    justifyContent: 'flex-end',
  },
  readTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'InknutAntiqua-Medium',
    lineHeight: 30,
    padding: 10,
  },
  readContent: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  readFullText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: '#FFC243',
    paddingHorizontal: 60,
    paddingVertical: 14,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
  shareButtonText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'InknutAntiqua-Medium',
  },
  backButton: {
    backgroundColor: '#FFC243',
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 30,
  },
  backButtonText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'InknutAntiqua-Medium',
  },
});
