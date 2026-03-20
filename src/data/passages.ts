export const passages = [
  "The quick brown fox jumps over the lazy dog near the riverbank as the sun sets behind the mountains.",
  "Programming is the art of telling another human what one wants the computer to do in a language both can understand.",
  "In the middle of difficulty lies opportunity. The measure of intelligence is the ability to change and adapt.",
  "Not all those who wander are lost. The world is a book and those who do not travel read only one page.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts above all else.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "Two things are infinite: the universe and human stupidity, and I am not yet completely sure about the universe.",
  "Life is what happens when you are busy making other plans. Time flies over us but leaves its shadow behind.",
  "The only way to do great work is to love what you do. Stay hungry, stay foolish, and never stop learning.",
  "It does not matter how slowly you go as long as you do not stop moving forward toward your goals.",
];

export function getRandomPassage(): string {
  return passages[Math.floor(Math.random() * passages.length)];
}
