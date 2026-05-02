import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  remaining: number;
  limit: number;
  featureName: string;
}

export function UsageIndicator({ remaining, limit, featureName }: Props) {
  const used = limit - remaining;
  const fraction = used / limit;
  const isLow = remaining <= 1;
  const isAtLimit = remaining === 0;

  const barColor = isAtLimit ? "#E57373" : isLow ? "#FFB74D" : "#B83A6B";
  const textColor = isAtLimit ? "#E57373" : isLow ? "#E65100" : "#9B7BAF";

  return (
    <View style={s.row}>
      <View style={s.barTrack}>
        <View
          style={[
            s.barFill,
            { width: `${Math.min(fraction * 100, 100)}%` as any, backgroundColor: barColor },
          ]}
        />
      </View>
      <Text style={[s.label, { color: textColor }]}>
        {isAtLimit
          ? `${featureName} limit reached for today`
          : `${remaining} of ${limit} free today`}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    marginBottom: 2,
  },
  barTrack: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E8D5F5",
    overflow: "hidden",
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "500" as const,
  },
});
