import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native'
import Constants from 'expo-constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {  Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import api from '../../services/api'
import  * as Location from "expo-location";

interface Item {
  id: number,
  title: string,
  imageUrl: string
}

interface Points {
  id: number,
  name: string,
  image: string,
  latitude: number,
  longitude: number
}



const Points = () => {
    const navigation = useNavigation()

    const [items, setItems] = useState<Item[]>([])
    const [selectedItems, setselectedItems] = useState<number[]>([])
    const [initialPostion, setinitialPostion] = useState<[number, number]>([0, 0])
    const [points, setpoints] = useState<Points[]>([])


    const handleNavigateBack = () => {
        navigation.goBack()
    }

    const handleNavigateToDetails = () => {
        navigation.navigate('Details')
    }

    useEffect(() => {
      api.get('items')
        .then(({data}) => setItems(data))
    }, [])

    useEffect(() => {
      const getPosition = async() => {
        const { status } = await Location.requestPermissionsAsync()

        if(status !== 'granted') {
            Alert.alert('Opps', 'Opps we need your location')
            return;
        }

        const location = await Location.getCurrentPositionAsync()

        const { latitude, longitude } = location.coords

        setinitialPostion([latitude, longitude])
      }
      getPosition()
    }, [])

    useEffect(() => {
      api.get('points', {
        params: {
          city: 'Guarulhos',
          uf: 'SP',
          items: [1, 2, 3, 4, 5, 6]
        }
      }).then(res => {setpoints(res.data)})
    }, [])

    const handleSelectedItem = (id: number) => {
      if(selectedItems.indexOf(id) >= 0) {
          const items = selectedItems.filter(itemId => itemId !== id )
          return setselectedItems(items)
      }
      setselectedItems([...selectedItems, id]) 
    }



    return (
        <>
            <View style={styles.container} >
                <TouchableOpacity onPress={handleNavigateBack} >
                    <Icon name="arrow-left" size={20} color="#34CB79"/>
                </TouchableOpacity>
                <Text style={styles.title} >Welcome.</Text>
                <Text style={styles.description} >Find a Collector Place</Text>

                <View style={styles.mapContainer}>
                    {initialPostion[0] !== 0 && (
                      <MapView 
                          style={styles.map} 
                          initialRegion={{
                              latitude: -23.4225664,
                              longitude: -46.53056,
                              latitudeDelta: 0.014,
                              longitudeDelta: 0.014
                          }}
                      >
                        {
                          points.map(point => (
                            <Marker 
                                key={String(point.id)}
                                style={styles.mapMarker}
                                onPress={handleNavigateToDetails}
                                coordinate={{
                                latitude: point.latitude,
                                longitude: point.longitude
                            }}>
                                <View style={styles.mapMarkerContainer}>
                                    <Image style={styles.mapMarkerImage} source={{ uri: point.image}}/>
                                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                </View>
                            </Marker>
                          ))
                        }
                      </MapView>
                    )}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 20}}
                >
                  {
                    items.map(item => (
                      <TouchableOpacity  
                        key={String(item.id)} 
                        style={[
                          styles.item,
                          selectedItems.includes(item.id) ? styles.selectedItem : {}
                        ]} 
                        onPress={() => handleSelectedItem(item.id)} 
                        activeOpacity={0.6}
                      >
                          <SvgUri width={40} height={40} uri={item.imageUrl}/>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
            </View>
        </>
        
    )
}

export default Points

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

// interface Points {
//   id: number,
//   longitute: number,
//   items: {
//     title: string
//   }[]
// }