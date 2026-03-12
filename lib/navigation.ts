export type Screen =
  | { type: "course-detail"; courseId: number }
  | { type: "student-detail"; studentId: number }
  | { type: "session-detail"; sessionId: number }
  | { type: "attendance"; sessionId: number }
  | { type: "teaching-feedback"; courseId?: number; studentId?: number }
  | { type: "message-detail"; messageId: number }

export interface NavigationProps {
  onNavigate: (screen: Screen) => void
  onBack: () => void
}
