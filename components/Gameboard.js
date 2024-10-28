import { Pressable, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../styles/style';
import Header from './Header';
import Footer from './Footer';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMIT
} from '../constants/Game';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Container, Row, Col } from 'react-native-flex-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { horizontalScale, verticalScale, moderateScale } from './Metrics'

export default function Gameboard({ navigation, route }) {

    const [playerName, setPlayerName] = useState('')
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('You have to throw dices')
    const [gameEndStatus, setGameEndStatus] = useState(false)
    // Which dice are selected (locked)
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))
    // Values of the dice
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0))
    // Total points for each spot
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0))
    // Which spots have been selected for points
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false))
    // Board state
    const [board, setBoard] = useState(new Array(NBR_OF_DICES).fill('dice-1'))
    const [points, setPoints] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)
    const [bonusAdded, setBonusAdded] = useState(false)

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player)
        }
    }, [route.params?.player, playerName])

    // Create dice row
    const dicesRow = []
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable onPress={() => chooseDice(dice)}>
                    <MaterialCommunityIcons
                        name={board[dice]}
                        size={50}
                        color={getDiceColor(dice)}
                    />
                </Pressable>
            </Col>
        )
    }

    // Create points row
    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"pointsRow" + spot} style={{ alignItems: 'center' }}>
                <Text>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }

    // Create points selection row
    const pointsToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton} style={{ alignItems: 'center' }}>
                <Pressable onPress={() => selectDicePoints(diceButton)}>
                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        size={35}
                        color={getDicePointsColor(diceButton)}
                    />
                </Pressable>
            </Col>
        )
    }

    // Function to handle selecting/deselecting a dice
    const chooseDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices]
            dices[i] = selectedDices[i] ? false : true
            setSelectedDices(dices)
        } else {
            setStatus('You have to throw dices first.')
        }
    };

    // Get color for dice based on selection
    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "steelblue"
    }

    // Get color for dice points based on selection
    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "black" : "steelblue"
    }

    // Function to select where to put points
    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            let select = [...selectedDices]
            let selectedPoints = [...selectedDicePoints]
            let points = [...dicePointsTotal]

            if (!selectedPoints[i]) {
                selectedPoints[i] = true
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
                points[i] = nbrOfDices * (i + 1)

                setDicePointsTotal(points)
                setSelectedDicePoints(selectedPoints)

                const allSelected = selectedPoints.every((p) => p)
                if (allSelected) {
                    let total = points.reduce((a, b) => a + b, 0)
                    let bonus = 0
                    let bonusApplied = false

                    if (total >= BONUS_POINTS_LIMIT) {
                        bonus = BONUS_POINTS
                        total += bonus
                        bonusApplied = true
                    }

                    setDicePointsTotal(total)
                    setBonusAdded(bonusApplied)
                    setGameEndStatus(true)
                    setStatus('Game finished. Your total points: ' + total + (bonusApplied ? 'Bonus applied' : ''))
                    saveScore(playerName, total)
                } 
                else {

                    setNbrOfThrowsLeft(NBR_OF_THROWS)
                    setSelectedDices(new Array(NBR_OF_DICES).fill(false))
                    setBoard(new Array(NBR_OF_DICES).fill('dice-1'))
                    setDiceSpots(new Array(NBR_OF_DICES).fill(0))

                    setStatus('New round started. Throw the dices!')
                }
                return points[i]
            } else {
                setStatus('You already selected points for ' + (i + 1))
            }
        } else {
            setStatus("Throw " + NBR_OF_THROWS + " times before setting points.")
        }
    }

    // Function to throw dices
    const throwDices = () => {
        if (nbrOfThrowsLeft > 0 && !gameEndStatus) {
            let spots = [...diceSpots]
            let newBoard = [...board]

            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * MAX_SPOT) + 1
                    newBoard[i] = 'dice-' + randomNumber
                    spots[i] = randomNumber
                }
            }
            setBoard(newBoard)
            setDiceSpots(spots)
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)
            setStatus('Select and throw dices again')
        } else {
            setStatus('You cannot throw dices at this moment. Select points')
        }
    };

    // Function to get total points for a spot
    function getSpotTotal(i) {
        return dicePointsTotal[i]
    }

    // Calculate the total score for livescore
    const calculateTotalPoints = () => {
        return dicePointsTotal.reduce((acc, curr) => acc + curr, 0);
    }

    // Save score for scoreboard
    const saveScore = async (playerName, score) => {
        try {
            const storedScores = await AsyncStorage.getItem('scores')
            let scores = storedScores ? JSON.parse(storedScores) : []
            const timestamp = new Date().toLocaleString()

            scores.push({ name: playerName, score, timestamp })

            scores.sort((a, b) => b.score - a.score)
            scores = scores.slice(0, 10)

            await AsyncStorage.setItem('scores', JSON.stringify(scores))
        } catch (error) {
            console.log('Failed to save score', error)

        }
    }

    return (
        <>
            <Header />
            <View>
                {gameEndStatus ? (
                    <View style={styles.endGameContainer}>
                        <Text style={styles.text}>Game over {playerName}</Text>
                        <Text style={styles.text}>Total Points: {dicePointsTotal}</Text>
                        {bonusAdded && <Text style={styles.text}>Bonus 50 Points Added!</Text>}
                        <Pressable
                            style={styles.buttonContainer2}
                            onPress={() => {
                                // Reset all states to restart the game
                                setNbrOfThrowsLeft(NBR_OF_THROWS);
                                setStatus('You have to throw dices');
                                setSelectedDices(new Array(NBR_OF_DICES).fill(false));
                                setDiceSpots(new Array(NBR_OF_DICES).fill(0));
                                setDicePointsTotal(new Array(MAX_SPOT).fill(0));
                                setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
                                setBoard(new Array(NBR_OF_DICES).fill('dice-1'));
                                setTotalPoints(0);
                                setBonusAdded(false);
                                setGameEndStatus(false);
                            }}
                        >
                            <Text style={styles.text}>Restart Game</Text>
                        </Pressable>
                    </View>
                ) : (
                    <>
                        <Container>
                            <Row>{dicesRow}</Row>
                        </Container>
                        <Text style={styles.text}>Throws left: {nbrOfThrowsLeft}</Text>
                        <Text style={styles.text}>{status}</Text>
                        <Pressable style={styles.buttonContainer2} onPress={throwDices}>
                            <Text style={styles.text}>THROW DICES</Text>
                        </Pressable>
                        <Container>
                            <Row>{pointsRow}</Row>
                        </Container>
                        <Container>
                            <Row>{pointsToSelectRow}</Row>
                        </Container>
                        <Text style={styles.text}>Player: {playerName}</Text>
                        <Text style={styles.text}>Points: {calculateTotalPoints()}</Text>
                        <Text style={styles.text}>63 points for bonus points</Text>
                    </>
                )}
            </View>
            <Footer />
        </>
    )
}