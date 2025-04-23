import type {Quiz} from "~/quizTypes"

export async function getQuizData(): Promise<Quiz> {
    try {
        const response = await fetch("https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json")

        if (!response.ok) {
            const responseText = await response.text()
            throw new Response(
                `Failed to fetch quiz data: ${response.status} ${response.statusText}\n${responseText}`,
                { status: response.status }
            )
        }
        return await response.json()
    } catch (error) {
        console.error("Error fetching quiz data:", error)
        throw error
    }
}