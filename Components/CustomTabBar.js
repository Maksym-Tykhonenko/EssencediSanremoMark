import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Цвета
const BAR_BG = '#191919';             // Фон всей панели
const TOP_LINE_COLOR = '#B29049';     // Золотая линия сверху
const ITEM_BG = '#121212';           // Фон квадрата под иконку
const INACTIVE_COLOR = '#FFFFFF';     // Цвет иконки/текста, когда НЕ активен
const ACTIVE_COLOR = '#FFC243';       // Цвет иконки/текста, когда вкладка активна

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    // Обёртка всей вкладочной панели
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      {/* Золотая линия сверху */}
      <View style={styles.topLine} />

      {/* Содержимое вкладок */}
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key] || {};
          const isFocused = state.index === index;

          // Определяем иконку + подпись
          let iconSource;
          let label = '';

          switch (route.name) {
            case 'Culture':
              iconSource = require('../assets/culture.png');
              label = 'Culture';
              break;
            case 'Maps':
              iconSource = require('../assets/map.png');
              label = 'Maps';
              break;
            case 'Menu': // Экран, который вы назвали Explorer
              iconSource = require('../assets/explor.png');
              label = 'Explorer';
              break;
            case 'Tips':
              iconSource = require('../assets/tips.png');
              label = 'Tips';
              break;
            case 'Saved':
              iconSource = require('../assets/saved.png');
              label = 'Saved';
              break;
            default:
              iconSource = require('../assets/saved.png');
              label = route.name;
          }

          // Цвет для иконки и текста
          const tintColor = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

          // Обработчик нажатия
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={onPress}
              activeOpacity={0.8}
            >
              {/* Квадрат с иконкой */}
              <View
                style={[
                  styles.iconBox,
                  isFocused && styles.iconBoxActive, // Золотая рамка для активного
                ]}
              >
                <Image
                  source={iconSource}
                  style={[styles.tabIcon, { tintColor }]}
                />
              </View>

              {/* Подпись */}
              <Text style={[styles.tabLabel, { color: '#FFFFFF' }]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}const styles = StyleSheet.create({
  // Родительский контейнер для всей таб-панели
  tabBarContainer: {
    backgroundColor: BAR_BG,
  },
  // Золотая линия сверху
  topLine: {
    height: 2,
    backgroundColor: TOP_LINE_COLOR,
    width: '100%',
  },
  // Ряд с иконками
  tabRow: {
    flexDirection: 'row',
    width: width,
    backgroundColor: BAR_BG,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 8,
  },
  // Каждая кнопка
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Квадрат под иконку
  iconBox: {
    width: 54,
    height: 54,
    backgroundColor: ITEM_BG,
    justifyContent: 'center',
    alignItems: 'center',
    // Без рамки по умолчанию
  },
  // Рамка вокруг активного
  iconBoxActive: {
    borderWidth: 1,
    borderColor: ACTIVE_COLOR,
  },
  // Сама иконка
  tabIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    
  },
  // Текст под иконкой
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'InknutAntiqua-Medium', 
    // Цвет задаётся через tintColor в зависимости от статуса
    // Можно добавить шрифт, если требуется
    // fontFamily: 'InknutAntiqua-Regular',
  },
});