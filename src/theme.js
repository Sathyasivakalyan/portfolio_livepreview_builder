const lightTheme = {
  "--bg": "#ffffff",
  "--text": "#000000",
};

const darkTheme = {
  "--bg": "#121212",
  "--text": "#ffffff",
};

function applyTheme(theme) {
  if (!document?.documentElement?.style) return;
  for (let key in theme) {
    document.documentElement.style.setProperty(key, theme[key]);
  }
}

// ✅ Export all
export { lightTheme, darkTheme, applyTheme };
