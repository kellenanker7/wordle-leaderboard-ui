export const wordleApi = "https://api.wordle.kellenanker.com";

export const colors = [
  "#C1DDE6",
  "#57C84D",
  "#83D475",
  "#ABE098",
  "#C5E8B7",
  "#FFFFB7",
  "#F6BDC0",
];

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
