import { Pressable, Text, View } from 'react-native'
import styles from '../styles/style'
import Header from './Header'
import Footer from './Footer'
import MaterialCommonityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { horizontalScale, verticalScale, moderateScale } from './Metrics'

export default function Scoreborad({ navigation }) {

    const [scores, setScores] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const storedScores = await AsyncStorage.getItem('scores')
                const parsedScores = storedScores ? JSON.parse(storedScores) : []
                setScores(parsedScores)
            } catch (error) {
                console.error('Failed to load scores:', error)
            }
        })

        return unsubscribe
    }, [navigation])

    const clearScores = async () => {
        await AsyncStorage.removeItem('scores');
        setScores([]);
    }


    return (
        <>
            <Header />
            <View>
                <MaterialCommonityIcons style={styles.icon} name="format-list-numbered" size={50} color='steelblue' />
                <Text style={styles.text}>Top ten</Text>
                {scores.length === 0 ? (
                    <Text style={styles.text}>Scoreboard is empty</Text>
                ) : (
                    scores.map((score, index) => (
                        <Text key={index} style={styles.toptentext}>{index + 1}. {score.name}: {score.score} | {score.timestamp}</Text>
                    ))
                )}
                <Pressable style={styles.buttonContainer2} onPress={clearScores}>
                    <Text style={styles.text}>CLEAR SCOREBOARD</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    )
}