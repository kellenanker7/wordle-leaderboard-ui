export const wordleApi = "https://api.wordle.kellenanker.com";

export const colors = {
  1: "#2EB62C",
  2: "#57C84D",
  3: "#83D475",
  4: "#ABE098",
  5: "#C5E8B7",
  6: "#FFFFB7",
};

export const formatNumber = (n) =>
  `(${String(n).substring(0, 3)}) ${String(n).substring(3, 6)}-${String(
    n
  ).substring(6)}`;
