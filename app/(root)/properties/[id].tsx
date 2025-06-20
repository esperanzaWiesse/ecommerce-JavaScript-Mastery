import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router"; // proporciona la funcionalidad para que extraiga el id de los parametros de identificacion

const Property = () => {

    const {id} = useLocalSearchParams();

    return (
        <View>
            <Text>Property {id}</Text>
        </View>
    )
}
export default Property;