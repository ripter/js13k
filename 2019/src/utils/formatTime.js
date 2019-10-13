export function formatTime(milliseconds) {
  const pad = (num) => num < 10 ? '0' + num : '' + num;
  const minutes = pad(0|(milliseconds/1000)/60);
  const seconds = pad(0|(milliseconds/1000)-(minutes*60));

  return `${minutes}:${seconds}`;
}
