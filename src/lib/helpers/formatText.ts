function formatText(text: string) {
  const txt = text.split(' ');
  return txt
    .map((word) => {
      if (word.length > 3) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word.toLowerCase();
      }
    })
    .join(' ');
}

export { formatText };
