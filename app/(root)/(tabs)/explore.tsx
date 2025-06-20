import {  Image, Text, TouchableOpacity, View, FlatList, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCards } from "@/components/cards";
import { Filters } from '@/components/Filters';
import { router } from "expo-router";

const Explore = () => {
    return (
        <SafeAreaView className="bg-white h-full">
              <View className="px-5">
                <View className="flex flex-row items-center justify-between mt-5">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                        <Image source={icons.backArrow} className="size-5" />
                    </TouchableOpacity>
                    <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                        Search for Your Ideal Home
                    </Text>
                    <Image source={icons.bell} className="w-6 h-6" />
                </View>
                <Search/>
              </View>
        
              <ScrollView contentContainerClassName="pb-32 px-0.5">
                <View className="px-5">  
                  <View className="my-5">
                    <View className="flex flex-row items-center justify-between">
                      <Text className="text-xl font-rubik-bold text-black-300">
                        Found 2 properties
                      </Text>
                    </View>
                    <Filters/>
                    <View className="flex flex-row gap-5 mt-5">
                      <Card/>
                      <Card/>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
    )
}

export default Explore