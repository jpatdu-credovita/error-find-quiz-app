// Types for the activities, rounds, and questions
export type QuestionType = ("TrueFalse")

export interface Question {
    stimulus: string
    order: number
    user_answers: any[]
    feedback?: string
    questionType: QuestionType
}

export interface TrueFalseQuestion extends Question {
    questionType: "TrueFalse"
    is_correct: boolean
}

export interface Round {
    round_title?: string
    order: number
    questions: Question[]
}

export interface Activity {
    activity_name: string
    order: number
    questions: ( Question[] | Round[] )
}

export type ActivityRoundType = ("multiRound" | "singleRound")

export interface TransformedActivity extends Activity {
    questions: Round[]
    roundType: ActivityRoundType
}

export interface Quiz {
    name: string
    heading?: string
    activities: Activity[]
}

// Types for the results
export interface QuestionResult extends Question {
    roundTitle: string
    roundNumber: number
    isUserAnswerCorrect: boolean
}

export interface TrueFalseQuestionResult extends QuestionResult, TrueFalseQuestion {
    is_correct: boolean
    questionType: "TrueFalse"
}

export interface RoundResult {
    round_title?: string
    order: number
    results: QuestionResult[]
}