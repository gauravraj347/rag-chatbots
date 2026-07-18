import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(client);

async function main() {
  try {
    const response = await client.responses.create({
      model: "gpt-5",
      input: "Hello",
    });

    console.log(response.output_text);
  } catch (e: any) {
    console.log("Status:", e.status);
    console.log("Headers:", e.headers);
    console.log("Error:", e.error);
    console.log("Message:", e.message);
  }
}

main();