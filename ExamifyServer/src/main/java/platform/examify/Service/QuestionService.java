package platform.examify.Service;

import java.util.Set;

import platform.examify.Exception.QuestionException;
import platform.examify.model.Question;
import platform.examify.model.Quiz;

public interface QuestionService {

	public Question addQuestion(Question question) throws QuestionException;

	public Question updateQuestion(Question question) throws QuestionException;

	public Set<Question> getQuestion() throws QuestionException;

	public Question getQuestionById(Long questionId) throws QuestionException;

	public Set<Question> getQuestionOfQuiz(Quiz quiz) throws QuestionException;

	public Question deleteQuestion(Long questionId) throws QuestionException;

	public Question getQuestionByIdForEvaluateQuiz(Long questionId) throws QuestionException;
}
