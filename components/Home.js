import { Keyboard, Pressable, Text, View } from 'react-native'
import MaterialCommonityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../styles/style'
import Header from './Header'
import Footer from './Footer'
import { horizontalScale, verticalScale, moderateScale } from './Metrics'
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMIT
} from '../constants/Game'
import { useState } from 'react'
import { TextInput } from 'react-native-paper'

export default function Home({ navigation }) {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, SetHasPlayerName] = useState(false)

    function handlePlayerName(value) {
        if (value.trim().length > 0) {
            SetHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

    return (
        <>
            <Header />
            <View>
                <View style={styles.icon}>
                    <MaterialCommonityIcons style={styles.icon} name="dice-1-outline" size={moderateScale(10)} color='steelblue' />
                    <MaterialCommonityIcons style={styles.icon} name="dice-2-outline" size={moderateScale(20)} color='steelblue' />
                    <MaterialCommonityIcons style={styles.icon} name="dice-3-outline" size={moderateScale(30)} color='steelblue' />
                    <MaterialCommonityIcons style={styles.icon} name="dice-4-outline" size={moderateScale(40)} color='steelblue' />
                    <MaterialCommonityIcons style={styles.icon} name="dice-5-outline" size={moderateScale(50)} color='steelblue' />
                    <MaterialCommonityIcons style={styles.icon} name="dice-6-outline" size={moderateScale(60)} color='steelblue' />
                </View>
                {!hasPlayerName ?
                    <>
                        <Text style={styles.text}>For scoreboard enter your name</Text>
                        <TextInput style={styles.textinput} onChangeText={setPlayerName} autoFocus={true} />
                        <Pressable style={styles.buttonContainer} onPress={() => handlePlayerName(playerName)}>
                            <Text style={styles.text}>OK</Text>
                        </Pressable>
                    </>
                    :
                    <>
                        <Text style={styles.text}>Rules of the game</Text>
                        <Text style={styles.text2} multiline="true">
                            THE GAME: Upper section of the classic Yahtzee
                            dice game. You have {NBR_OF_DICES} dices and
                            for the every dice you have {NBR_OF_THROWS}
                            throws. After each throw you can keep dices in
                            order to get same dice spot counts as many as
                            possible. In the end of the turn you must select
                            your points from {MIN_SPOT} to {MAX_SPOT}.
                            Game ends when all points have been selected.
                            The order for selecting those is free.
                            POINTS: After each turn game calculates the sum
                            for the dices you selected. Only the dices having
                            the same spot count are calculated. Inside the
                            game you can not select same points from
                            {MIN_SPOT} to {MAX_SPOT} again.
                            GOAL: To get points as much as possible.
                            {BONUS_POINTS_LIMIT} points is the limit of
                            getting bonus which gives you {BONUS_POINTS}
                            points more.
                        </Text>
                        <Text style={styles.text}>Good luck, {playerName}</Text>
                        <Pressable style={styles.buttonContainer2} onPress={() => navigation.navigate('Gameboard', { player: playerName })}>
                            <Text style={styles.text}>LET'S PLAY</Text>
                        </Pressable>
                    </>
                }
            </View>
            <Footer />
        </>
    )
}