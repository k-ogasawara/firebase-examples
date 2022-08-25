module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
    "prettier"
  ],
  rules: {
    "new-cap": "off"
  },
};
