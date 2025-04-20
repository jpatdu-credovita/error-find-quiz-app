export async function getQuizData() {
    try {
        const response = await fetch("https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json")

        if (!response.ok) {
            const responseText = await response.text()
            throw new Response(
                `Failed to fetch quiz data: ${response.status} ${response.statusText}\n${responseText}`,
                { status: response.status }
            )
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching quiz data:", error)
        throw error
    }
}