package platform.examify.ServiceImpl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.examify.Exception.QuestionException;
import platform.examify.Repository.QuestionRepository;
import platform.examify.Service.QuestionService;
import platform.examify.model.Question;
import platform.examify.model.Quiz;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository questionRepository;

	@Override
	public Question addQuestion(Question question) throws QuestionException {
		// TODO Auto-generated method stub
		if (question == null) {
			throw new QuestionException("Question Details Required !");
		}

		try {
			return questionRepository.save(question);
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}
	}

	@Override
	public Question updateQuestion(Question question) throws QuestionException {
		// TODO Auto-generated method stub
		try {
			return questionRepository.save(question);
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}
	}

	@Override
	public Set<Question> getQuestion() throws QuestionException {
		// TODO Auto-generated method stub
		try {
			return new HashSet<>(questionRepository.findAll());
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}
	}

	@Override
	public Question getQuestionById(Long questionId) throws QuestionException {
		// TODO Auto-generated method stub
		Optional<Question> question = questionRepository.findById(questionId);

		if (question.isPresent()) {
			return question.get();
		} else {
			throw new QuestionException("Question not found !");
		}
	}

	@Override
	public Set<Question> getQuestionOfQuiz(Quiz quiz) throws QuestionException {

		// TODO Auto-generated method stub
		try {

			Set<Question> questions = questionRepository.findByQuiz(quiz);

			return questions;
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());

		}
	}

	@Override
	public Question deleteQuestion(Long questionId) throws QuestionException {

		try {

			Optional<Question> question = questionRepository.findById(questionId);
			if (question.isPresent()) {
				questionRepository.deleteById(questionId);
				return question.get();
			} else {
				throw new QuestionException("Question not found !");
			}

		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}
	}
	
	@Override
	public Question getQuestionByIdForEvaluateQuiz(Long questionId) throws QuestionException {
		// TODO Auto-generated method stub
		Optional<Question> question = questionRepository.findById(questionId);

		if (question.isPresent()) {
			return question.get();
		} else {
			throw new QuestionException("Question not found !");
		}
	}
	
	

}
