const Colors = {
  GREEN: "#80CC28",
  ORANGE: "#F68C11",
  PINK: "#ED166D",
  BLUE: "#1F1D42",
};

/**
 * @param {string} hex - Hex
 * @param {number} alpha - Transparant value
 * @returns {string} - RGBA color code.
 */

const hexToRgba = (hex, alpha) => {
  if (hex.length !== 7 || hex[0] !== "#") {
    throw new Error("Invalid hex color");
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// %40 transparant ORANGE
Colors.transparentORANGE40 = hexToRgba(Colors.ORANGE, 0.4);

export default Colors;