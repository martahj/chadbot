const Botkit = require('botkit');

const token = process.env.SLACK_TOKEN

const controller = Botkit.slackbot({
  debug: false
});

if (token) {
  console.log("Starting in single-team mode")
  controller.spawn({
    token: token
  }).startRTM(function(err,bot,payload) {
    if (err) {
      throw new Error(err);
    }
  });
}

const getRandomArbitrary = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomReply = (messages) => messages[getRandomArbitrary(0, messages.length)];

const getLastCharacter = string => string[string.length - 1];

const decapitalize = (message) => message[0].toLowerCase() + message.slice(1);

const withUser = user => `<@${user}>`;

const allMessages = [
  `We know we will win the superbowl next year, but season ticket holders won’t stand for a 0 and 12 record this season.`,
  `Walking and chewing gum is not something everyone can do, our people can do that`,
  `You need to start thinking of yourselves as Navy Seals.`,
  `We are good with deadlines here`,
  `We don’t do variables well.`,
  `We are like the circus`,
  `Salesforce is turning from our junk drawer into our knife drawer.`,
  `In 2008 we were artists, then in the past few years we became massage therapists, we had some skills and training but still an artist touch with candles and aromatherapy, we are moving to a world where we are laser eye surgeons. Things will be on our price and our terms, sign up or not.`,
  `It doesn’t matter if you are nearsighted or farsighted we have the best product`,
  `We are becoming laser eye surgeons`,
  `We slaughter the cow for the steak and don’t harvest anything else`,
  `We need to try before we buy`,
  `In love with the money I ain't never letting go`,
  `Married to the money, introduced her to my stove`,
  `We are agent friendly`,
  `“recovery” is no longer the buzzword`,
  `Money is in the bank`,
  `He is slippery enough for us`,
  `We are the Uber of real estate`,
  `It’s not 911, its 311.`,
  `When someone signs up they just get on the conveyer belt.`,
  `It's just a technical problem`,
  `We are on our way to an 8 and 8 season but will not be making it to the superbowl`,
  `Lets walk before we run`,
  `Families can tolerate disfunction and mediocrity, professional teams don’t`,
  `Unlike the Patriots, we have no limit on the number of A players we can have`,
  `You don’t send out a line backer to kick a 60 yard field goal`,
  `We don’t want to be Nordstrom on a Saturday with the doors chained`,
  `Its a technical problem`,
  `It is how you feel after thanksgiving but the stuffing was good`,
  `Pigs get fat, hogs get slaughtered`,
  `We have the cure for house cancer`,
];

const determineIfPrefix = () => Math.random() < 0.1;

const prefixes = [
  `Fundamentally...`,
  `To be clear...`,
];

const addPrefix = reply => `${getRandomReply(prefixes)}, ${decapitalize(reply)}`;

const makeReply = (reply) => {
  const needsPrefix = determineIfPrefix();
  return needsPrefix ? addPrefix(reply) : reply;
}

const makeRandomReply = (messages) => makeReply(getRandomReply(messages));

controller.on(['bot_group_join', 'bot_channel_join'], function(bot, message) {
  bot.reply(message,'Greetings. We’re the Navy Seals of Real Estate');
});

const greetings = [
  `Ask yourself: “How can I be more of an astronaut?”`,
  `If you see a piece of litter on the floor - pick it up, don’t tell someone else about it.`,
  `If you were a shark and there were no fish around you would die`,
  `We live in a zillow world`,
  `Days on market are not your friend`,
  `Take the time to dig deep`,
  `You are xbox tech support on christmas day`,
];

// a user has joined the channel
controller.on(['user_channel_join', 'user_group_join'], function(bot, message) {
  console.log('user channel join');
  const { user } = message;
  const reply = `Greetings, ${withUser(user)}. ${getRandomReply(greetings)}.`;
  bot.reply(message, reply);
});

const questionResponses = [
  `Valid question, I can’t fault you for asking.`,
  `Okay, I get that but what’s REALLY the question here?`,
];

const directMentionResponses = [
  `You are a little light for heavy work and a little heavy for light work.`,
  `Give me background, not noise.`,
  `Let’s make history!`,
  `We’re the Navy Seals of Real Estate.`,
  `Let’s take a step back.`,
  `We are the tesla of real estate.`,
  `You have to walk and chew gum.`,
  `We are making sausage.`,
];

// the bot was addressed directly in a channel
controller.on('direct_mention', function(bot, message) {
  const { text, user } = message;
  if (getLastCharacter(text) === '?') {
    return bot.reply(message, getRandomReply(questionResponses));
  }
  const reply = `${withUser(user)}, ${decapitalize(getRandomReply(directMentionResponses))}`;
  return bot.reply(message, reply);
});

const mentionReplies = [
  `We know we will win the superbowl next year, but season ticket holders won’t stand for a 0 and 12 record this season.`,
  `Walking and chewing gum is not something everyone can do, our people can do that`,
  `You need to start thinking of yourselves as Navy Seals.`,
  `We are like the circus`,
  `Salesforce is turning from our junk drawer into our knife drawer.`,
  `In 2008 we were artists, then in the past few years we became massage therapists, we had some skills and training but still an artist touch with candles and aromatherapy, we are moving to a world where we are laser eye surgeons. Things will be on our price and our terms, sign up or not.`,
  `It doesn’t matter if you are nearsighted or farsighted we have the best product`,
  `We are becoming laser eye surgeons`,
  `We slaughter the cow for the steak and don’t harvest anything else`,
  `We need to try before we buy`,
  `In love with the money I ain't never letting go`,
  `Married to the money, introduced her to my stove`,
  `We are agent friendly`,
  `He is slippery enough for us`,
  `We are the Uber of real estate`,
  `It’s not 911, its 311.`,
  `When someone signs up they just get on the conveyer belt.`,
  `It's just a technical problem`,
  `We are on our way to an 8 and 8 season but will not be making it to the superbowl`,
  `Lets walk before we run`,
  `Families can tolerate disfunction and mediocrity, professional teams don’t`,
  `Unlike the Patriots, we have no limit on the number of A players we can have`,
  `You don’t send out a line backer to kick a 60 yard field goal`,
  `We don’t want to be Nordstrom on a Saturday with the doors chained`,
  `Its a technical problem`,
  `It is how you feel after thanksgiving but the stuffing was good`,
  `Pigs get fat, hogs get slaughtered`,
  `We have the cure for house cancer`,
];

// // the bot was mentioned by someone in a message
// controller.on('mention', function(bot, message) {
//   console.log('got mention');
//   const { user } = message;
//   const reply = getRandomReply(mentionReplies);
//
//   const mentionUser = Math.random() < 2;
//   if (mentionUser) return bot.reply(message, `${withUser(user)}, ${decapitalize(reply)}`);
//   return bot.reply(message, makeReply(reply));
// });


controller.hears(['chad', 'chairman', 'boss', 'success', 'inspiration', 'real'], (bot, message) => {
  console.log('got mention');
  const { user } = message;
  const reply = getRandomReply(mentionReplies);

  const mentionUser = Math.random() < 2;
  if (mentionUser) return bot.reply(message, `${withUser(user)}, ${decapitalize(reply)}`);
  return bot.reply(message, makeReply(reply));
});

constroller.hears(['variable'], (bot, message) => {
  const shouldReply = Math.random() < .5;
  if (shouldReply) return bot.reply(message, `We don’t do variables well.`);
})

constroller.hears(['deadline'], (bot, message) => {
  const shouldReply = Math.random() < .5;
  if (shouldReply) return bot.reply(message, `We are good with deadlines here`);
})

controller.hears(["lol", "lmao", "haha"], ["ambient"], function(bot, message) {
  const shouldReply = Math.random() < .4;
  if (shouldReply) return bot.reply(message, `Let me be specific, that is hilarious`);
});

controller.hears(['astronaut'], ['ambient'], (bot, message) => {
  const shouldReply = Math.random() < .6;
  bot.reply(message, 'Ask yourself: “How can I be more of an astronaut?”');
});

const moneyReplies = [
  `In love with the money I ain't never letting go`,
  `Married to the money, introduced her to my stove`,
  `Money is in the bank`,
];

controller.hears(['money', 'rich', 'dolla', 'dollar', 'cash'], ['ambient'], (bot, message) => {
  const shouldReply = Math.random() < .7;
  if (!shouldReply) return;
  bot.reply(message, getRandomReply(moneyReplies));
});

controller.hears(['duplicate'], ['ambient'], (bot, message) => {
  return bot.reply(message, `Duplicate is a dirty word`);
});

controller.hears(['recovery'], ['ambient'], (bot, message) => {
  return bot.reply(message, `“recovery” is no longer the buzzword`);
});
