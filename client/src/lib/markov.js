const words = ["Hello", "Hi!", "I'm here", "How r u?", "Como estais?"];

export const randomWord = () => {
  const random = words[Math.floor(Math.random() * words.length)];
  console.log(random);
  return random;
};
