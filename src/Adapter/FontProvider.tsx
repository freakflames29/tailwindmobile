import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash visible while fonts are loading
SplashScreen.preventAutoHideAsync();

// 1️⃣ Define all fonts in one place
export enum FontsVariant {
  UrbanistBold = 'Urbanist-Bold',
  UrbanistRegular = 'Urbanist-Regular',
  Brunson="Brunson"
  // add more fonts easily later...
}

// 2️⃣ Context to expose font info globally
const FontContext = createContext({
  fontsLoaded: false,
  FontFamily: FontsVariant,
});

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider = ({ children }: FontProviderProps) => {
  // 3️⃣ Load fonts once
  const [fontsLoaded] = useFonts({
    [FontsVariant.UrbanistBold]: require('../../assets/fonts/Urbanist-Bold.ttf'),
    [FontsVariant.UrbanistRegular]: require('../../assets/fonts/Urbanist-Regular.ttf'),
    [FontsVariant.Brunson]: require('../../assets/fonts/Brunson.ttf'),
  });

  // 4️⃣ Control splash visibility
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    console.log(fontsLoaded);
  }, [fontsLoaded]);

  // 5️⃣ Show loader while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 6️⃣ Provide global font context
  return (
    <FontContext.Provider value={{ fontsLoaded, FontFamily: FontsVariant }}>
      {children}
    </FontContext.Provider>
  );
};

// 7️⃣ Optional helper hook — easy access anywhere
export const useFontFamily = () => {
  return useContext(FontContext).FontFamily;
};
