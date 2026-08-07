import "server-only"
import { generateText, NoObjectGeneratedError, Output } from 'ai';
import { groqModels } from "./groq-models";
import { habitSuggestionSchema, SUGGESTION_COUNT } from "./habit-suggestion-schema";

const SYSTEM_PROMPT = `
    You are a habit coach assistant.
    Based on the user's existing habits, suggest ${SUGGESTION_COUNT} new habits they should try.
    Rules:
    - Do not suggest habits the user already has
    - Consider the categories they are already focused on
    - Provide a brief reason for each suggestion
    - Assign a realistic difficulty level
    - Assign a recommended frequency
`.trim()

export async function suggestHabits(habits) {
    const existingHabits = habits.filter((habit) =>
        habit && typeof habit.name === "string" &&
        habit.name.trim() !== ""
    ).slice(0, 50);

    try {
        const result = await generateText({
            model: groqModels("openai/gpt-oss-20b"),
            system: SYSTEM_PROMPT,
            prompt: `The user currently has these habits:
                ${JSON.stringify(existingHabits, null, 2)}`.trim(),
            output: Output.object({
                name: "habit_suggestions",
                description: "Suggested habits based on user's existing habits",
                schema: habitSuggestionSchema,
            }),
            maxRetries: 0,
            providerOptions: {
                groq: {
                    reasoningEffort: "low",
                },
            },
            maxOutputTokens: 2500
        });

        return result.output;
    }
    catch (error) {
        if (NoObjectGeneratedError.isInstance(error)) {
            console.error("AI output did not match schema", {
                cause: error.cause,
                text: error.text,
                usage: error.usage,
            })
            throw new Error("The AI returned invalid suggestion data");
        }
        throw error;
    }
}