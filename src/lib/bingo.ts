export const bingoSquares = [
  'Someone coughs',
  'Someone Sneezes',
  'Someone exits and rejoins',
  'Someone has mic issues',
  'Someone swears',
  'Pet in view',
  'Child in view',
  'Can hear pet in background',
  'Can hear child in background',
  'Someone forgot to mute',
  'Someone forgot to unmute',
  'Someone presents the wrong screen/tab',
  'Someone forgets to present their screen',
  'Video is stalled',
  "Someone's phone rings or makes a notification sound",
  'Someone has to drop off early',
  'Someone arrives more than 5 min late',
  'Presenter needs to update Windows',
  'Presenter needs to update their browser',
  'Presenter has browser filled with tabs',
  'Presenter has more than 15 unread slack messages',
  'Presenter gets a slack notification',
  'Can hear other people in background',
  'Can see someone talking to another person off screen',
  'Someone needs to answer their door',
  'Someone is eating',
  'Loud typing sounds',
  'Awkward pre-meeting small talk',
  'Two or more people try to speak at once',
  "Someone's video gets frozen in a funny position",
  'New task gets added to sprint',
  'Next deployment gets delayed',
  'Someone mentions how no one is using their camera',
  `"Can everyone hear me?"`,
  `"Yes, we hear you"`,
  `"Sorry, I was muted"`,
  `"I think you're on mute"`,
  `"Can _____ stay after the meeting to discuss _____?"`,
  `"Is _____ in the meeting?"`,
  `"We can't hear you"`,
  `"Can everyone see my screen?"`,
  `"I'll have to get back to you on that"`,
  `"I'm sorry, say that again"`,
  `"That's not a bug, it's a feature"`,
  `"Let me give you X minutes of your time back"`,
  `"I'm sorry I'm late"`,
  `"Can we wrap this up?"`,
  `"Are you presenting? I can't see your screen"`,
  `"Sorry, what was the question?"`,
];

export const getWinConditions = (size: number) => {
  if (size <= 0 || Math.sqrt(size) % 1 !== 0) {
    throw new Error('Invalid Size');
  }

  const boardDimension = Math.sqrt(size);
  const conditions: number[][] = [[]];

  for (let index = 0; index < size; index++) {
    const row = Math.floor(index / boardDimension);
    Array.isArray(conditions[row]) ? conditions[row].push(index) : (conditions[row] = [index]);
  }

  for (let index = 0; index < boardDimension; index++) {
    const rowIndex = boardDimension + index;
    const condition = Array.from({ length: boardDimension }, (_, i) => (i - 1) * 5 + rowIndex);
    conditions[rowIndex] = condition;
  }

  conditions[boardDimension * 2 + 1] = Array.from(
    { length: boardDimension },
    (_, i) => i * boardDimension + i
  );
  conditions[boardDimension * 2 + 2] = Array.from(
    { length: boardDimension },
    (_, i) => i * boardDimension + (boardDimension - i - 1)
  );

  return conditions;
};
