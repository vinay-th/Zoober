import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import * as Location from 'expo-location';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { icons } from '@/constants';
import RideCard from '@/components/RideCard';
import { images } from '@/constants';
import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import { useLocationStore } from '@/store';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useFetch } from '@/lib/fetch';

const handleSingOut = () => {
  console.log('handleSingOut');
};
const handleDestinationPress = () => {
  console.log('handleDestinationPress');
};

export default function Page() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`);

  const [hasPermission, setHasPermission] = useState(false);

  const handleSignOut = () => {};
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push('/(root)/find-ride');
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
      });

      setUserLocation({
        // latitude: location.coords?.latitude,
        // longitude: location.coords?.longitude,
        latitude: 37.78825,
        longitude: -122.4324,
        address: `${(address[0].name, address[0].region)}`,
      });
    };
    requestLocation();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        // data={[]}
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides"
                  resizeMode="contain"
                />
              </>
            ) : (
              <ActivityIndicator size="large" color="#000" />
            )}
            <Text className="text-md">No recent rides found 😢</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-l font-JakartaExtraBold" numberOfLines={1}>
                Welcome{' '}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split('@')[0]}
                👋🏻
              </Text>
              <TouchableOpacity
                onPress={handleSingOut}
                className="justify-center items-center w-10 h-10 rounded-full bg bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>
            {/* GoogleTextInput */}
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300 "
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Recent rides
              </Text>
            </>
          </>
        )}
      />
    </SafeAreaView>
  );
}
