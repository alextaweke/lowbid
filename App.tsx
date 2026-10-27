import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  StatusBar,
} from "react-native";

const initialBids = [100, 100, 150, 200, 200, 250];

function getLowestUniqueBid(bids: number[]): number | null {
  const counts = new Map<number, number>();

  for (const bid of bids) {
    counts.set(bid, (counts.get(bid) ?? 0) + 1);
  }

  const uniqueBids = bids.filter((bid) => counts.get(bid) === 1);

  return uniqueBids.length > 0 ? Math.min(...uniqueBids) : null;
}

export default function App() {
  const [bids, setBids] = useState<number[]>(initialBids);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const winningBid = getLowestUniqueBid(bids);

  function placeBid() {
    const value = Number(amount);

    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      setMessage("Enter a valid bid amount greater than zero.");
      return;
    }

    if (!Number.isInteger(value)) {
      setMessage("Enter a whole number in ETB.");
      return;
    }

    const updatedBids = [...bids, value];

    setBids(updatedBids);
    setAmount("");

    const winner = getLowestUniqueBid(updatedBids);

    setMessage(
      winner === null
        ? "No unique bid yet. Try another amount!"
        : `Bid recorded! The lowest unique amount is ${winner} ETB.`,
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>BIDLY</Text>
          <Text style={styles.headerSubtitle}>Smart device bidding</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>LOWEST UNIQUE BID WINS</Text>
          <Text style={styles.heroTitle}>
            Your next device,{"\n"}your next winning bid.
          </Text>
          <Text style={styles.heroText}>
            Place your bid. Be unique. Win the device.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.deviceImage}>
            <Text style={styles.deviceEmoji}>📱</Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>DEMO AUCTION</Text>
          </View>

          <Text style={styles.deviceName}>Samsung Galaxy A17</Text>
          <Text style={styles.deviceDescription}>
            Smartphone · Sample listing
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>CURRENT LOWEST UNIQUE BID</Text>

          <Text style={styles.winningAmount}>
            {winningBid === null ? "No winner yet" : `${winningBid} ETB`}
          </Text>

          <Text style={styles.helper}>
            Demo calculation based on all submitted amounts
          </Text>

          <Text style={styles.inputLabel}>Your bid (ETB)</Text>

          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder="Enter your amount"
            placeholderTextColor="#8490A3"
          />

          <Pressable style={styles.button} onPress={placeBid}>
            <Text style={styles.buttonText}>Place Bid →</Text>
          </Pressable>

          {message !== "" && <Text style={styles.message}>{message}</Text>}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>How it works</Text>

          <Text style={styles.rule}>1. Submit a bid amount.</Text>
          <Text style={styles.rule}>
            2. The app counts how many times each amount appears.
          </Text>
          <Text style={styles.rule}>
            3. The smallest amount submitted exactly once wins.
          </Text>
        </View>

        <Text style={styles.footer}>
          Prototype only · No real auction or payments
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#101827",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  logo: {
    color: "#63E6BE",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 3,
  },
  headerSubtitle: {
    color: "#AAB5C7",
    marginTop: 4,
  },
  hero: {
    marginBottom: 24,
  },
  eyebrow: {
    color: "#63E6BE",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 12,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 38,
  },
  heroText: {
    color: "#B9C3D3",
    marginTop: 12,
    fontSize: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  deviceImage: {
    height: 150,
    backgroundColor: "#EAF8F3",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  deviceEmoji: {
    fontSize: 76,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#DDF8ED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  tagText: {
    color: "#087F5B",
    fontSize: 10,
    fontWeight: "800",
  },
  deviceName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#172033",
    marginTop: 12,
  },
  deviceDescription: {
    color: "#737F91",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#E7EBF0",
    marginVertical: 20,
  },
  label: {
    color: "#737F91",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  winningAmount: {
    fontSize: 30,
    fontWeight: "900",
    color: "#087F5B",
    marginTop: 8,
  },
  helper: {
    color: "#737F91",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 24,
  },
  inputLabel: {
    color: "#172033",
    fontWeight: "700",
    marginBottom: 9,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9E0E9",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#172033",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#087F5B",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  message: {
    marginTop: 14,
    color: "#087F5B",
    fontWeight: "600",
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 19,
    color: "#172033",
    fontWeight: "800",
    marginBottom: 14,
  },
  rule: {
    fontSize: 14,
    color: "#536075",
    lineHeight: 24,
    marginBottom: 8,
  },
  footer: {
    textAlign: "center",
    color: "#AAB5C7",
    fontSize: 12,
    marginTop: 4,
  },
});
