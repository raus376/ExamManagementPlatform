package platform.examify.Service;

import java.util.Set;

import platform.examify.Exception.QuizException;
import platform.examify.model.Quiz;

public interface QuizService {

	public Quiz addQuiz(Quiz quiz) throws QuizException;

	public Quiz getQuiz(Integer quizId) throws QuizException;

	public Set<Quiz> getQuizzes() throws QuizException;

	public Quiz updateQuiz(Quiz quiz) throws QuizException;

	public Quiz deleteQuiz(Integer quizId) throws QuizException;

	public Set<Quiz> getQuizzesByCategoryId(Integer cId) throws QuizException;

	public Set<Quiz> getActiveQuizzes() throws QuizException;

	public Set<Quiz> getActiveQuizzesOfCategory(Integer cId) throws QuizException;
}
