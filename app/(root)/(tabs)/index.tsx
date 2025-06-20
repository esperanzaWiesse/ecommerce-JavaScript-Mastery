import {  Image, Text, TouchableOpacity, View, FlatList, ScrollView, Button } from "react-native";

import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCards } from "@/components/cards";
import { Filters } from '@/components/Filters';

import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// import NoResults from "@/components/NoResults";

import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
// import { getLatestProperties, getProperties } from "@/lib/appwrite";

export default function Index() {

  const { user } = useGlobalContext();

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
//     <SafeAreaView className="bg-white h-full">
// <Button title="Seed" onPress={seed}/>

//       <View className="px-5">
//         <View className="flex flex-row items-center justify-between mt-5">
//           <View className="flex flex-row items-center">
//             <Image source={images.avatar} className="size-12 rounded-full"/>
//             <View className="flex flex-col items-start ml-2 justify-center">
//               <Text className="text-xs font-ribik text-black-100">
//                 Good Day!
//               </Text>
//               <Text className="text-base font-rubik-medium tet-black-300">
//                 Adrian
//               </Text>
//             </View>
//           </View>
//           <Image source={icons.bell} className="size-6"/>
//         </View>
//         <Search/>
//       </View>

//       <ScrollView contentContainerClassName="pb-32 px-0.5">
//         <View className="px-5">
//           <View className="my-5">
//             <View className="flex flex-row items-center justify-between">
//               <Text className="text-xl font-rubik-bold text-black-300">
//                 Featured
//               </Text>
//               <TouchableOpacity>
//                 <Text className="text-base font-rubik-bold text-primary-300">
//                   See All
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View className="flex flex-row gap-5 mt-5">
//               <FeaturedCards/>
//               <FeaturedCards/>
//               <FeaturedCards/>
//             </View>
//           </View>

//           <View className="my-5">
//             <View className="flex flex-row items-center justify-between">
//               <Text className="text-xl font-rubik-bold text-black-300">
//                 Our recommendation
//               </Text>
//               <TouchableOpacity>
//                 <Text className="text-base font-rubik-bold text-primary-300">
//                   See All
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <Filters/>
//             <View className="flex flex-row gap-5 mt-5">
//               <Card/>
//               <Card/>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>



    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={[1,2,3,4,5,6,7]}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />

                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>

            {/* <Button title="seed" onPress={seed} /> */}

            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
