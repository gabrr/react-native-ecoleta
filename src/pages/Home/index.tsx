import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { AppLoading } from 'expo'
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const [fontsReload] = useFonts({Roboto_500Medium, Roboto_400Regular, Ubuntu_700Bold})
    
    if(!fontsReload) {
        return <AppLoading/>
    }

    const navigation = useNavigation()

    const handleNavigateToPoints = () => {
      navigation.navigate('Points')
    }



    return (
          <ImageBackground 
              style={styles.container}
              source={require('../../assets/home-background.png')}
              imageStyle={{height: 368, width: 274}}
          >
              <View style={styles.main}>
                  <Image source={require('../../assets/logo.png')}/>
              
                  <Text style={styles.title} >Your Marketplace Helping The World</Text>
                  <Text style={styles.description}>We help people to find a collect place efficiently</Text>
              </View>
              <View style={styles.footer}>
                  <RectButton style={styles.button} onPress={handleNavigateToPoints} >
                      <View style={styles.buttonIcon}>
                        <Text>
                          <Icon name="arrow-right" color="#FFF" size={23} />
                        </Text>
                      </View>
                      <Text style={styles.buttonText}>Enter</Text>
                  </RectButton>
              </View>
          </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });
