import { z } from "zod";

export const SUGGESTION_COUNT = 3;

export const habitSuggestionSchema = z.object({
    suggestions: z.array(
        z.object({
            name: z.string().min(1),
            category: z.enum(["Health", "Learning", "Fitness"]),
            reason: z.string().min(10).max(300),
            difficulty: z.enum(["Easy", "Medium", "Hard"]),
            frequency: z.enum(["Daily", "Weekly"])
        })
    ).length(SUGGESTION_COUNT)
})