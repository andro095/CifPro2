module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: [],
  theme: {
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {

      fontFamily: {
        raleway: ["Raleway", " sans-serif"],
      },
      fontSize: {
        ktitle: "3.8125rem",
      },
      textColor: {
        ktitlecolor: "#2A3475",
      },
      height: {
        15: "3.75rem",
        "fit-content": "fit-content",
        18: "4.5rem",
      },
      padding: {
        form: "30px",
      },
      borderRadius: {
        form: "50px",
      },
      boxShadow: {
        form: "0 0 24px 0 rgba(0, 0, 0, 0.27)",
      },
      borderColor: {
        myblue: "#4656C2",
        button: "#586DF5",
      },
      margin: {
        field: "17px",
      },
      backgroundColor: {
        button: "#586DF5",
        textFieldFocused: "#A3AEF7",
        ktitlecolor: "#2A3475",
      },
    },
  },
  variants: {},
  plugins: [],
}
