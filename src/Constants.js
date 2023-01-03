export const wordleApi = "https://api.wordle.kellenanker.com";

export const colors = {
  1: "#C1DDE6",
  2: "#57C84D",
  3: "#83D475",
  4: "#ABE098",
  5: "#C5E8B7",
  6: "#FFFFB7",
  7: "#F6BDC0",
};

export const formatNumber = (n) =>
  `(${String(n).substring(0, 3)}) ${String(n).substring(3, 6)}-${String(
    n
  ).substring(6)}`;

export const formatName = (n) => {
  return n
    ? String(n)
        .split(" ")[0]
        .replace(/\w*/, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
    : null;
};
