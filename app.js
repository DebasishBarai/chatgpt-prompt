import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';
config();

console.log(process.env.API_KEY);

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var message = [];
userInterface.prompt();

userInterface.on('line', async (input) => {
  message = [...message, { role: 'user', content: input }];
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: message,
  });

  console.log(res.data.choices[0].message.content);

  userInterface.prompt();
});
