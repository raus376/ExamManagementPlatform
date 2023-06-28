package platform.examify.ServiceImpl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.examify.Exception.CategoryException;
import platform.examify.Exception.QuizException;
import platform.examify.Repository.QuizRepository;
import platform.examify.Service.QuizService;
import platform.examify.model.Category;
import platform.examify.model.Quiz;

@Service
public class QuizServiceImpl implements QuizService {

	@Autowired
	private QuizRepository quizRepository;

	@Override
	public Quiz addQuiz(Quiz quiz) throws QuizException {

		if (quiz == null) {
			throw new QuizException("Quiz Details Required !");
		}

		try {
			return quizRepository.save(quiz);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@Override
	public Quiz getQuiz(Integer quizId) throws QuizException {
		// TODO Auto-generated method stub
		Optional<Quiz> quizOpt = quizRepository.findById(quizId);

		if (quizOpt.isPresent()) {
			return quizOpt.get();
		} else {
			throw new QuizException("Quiz not found !");
		}
	}

	@Override
	public Set<Quiz> getQuizzes() throws QuizException {
		// TODO Auto-generated method stub
		try {
			return new HashSet<>(this.quizRepository.findAll());
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) throws QuizException {
		if (quiz == null) {
			throw new QuizException("Quiz Details Required !");
		}

		try {
			return quizRepository.save(quiz);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@Override
	public Quiz deleteQuiz(Integer quizId) throws QuizException {
		// TODO Auto-generated method stub
		try {
			Optional<Quiz> quizOpt = this.quizRepository.findById(quizId);

			if (quizOpt.isPresent()) {
				this.quizRepository.deleteById(quizId);
				return quizOpt.get();
			} else {
				throw new QuizException("Quiz Not found !");
			}
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@Override
	public Set<Quiz> getQuizzesByCategoryId(Integer cId) throws QuizException {

		// TODO Auto-generated method stub
		try {
			Category category = new Category();
			category.setCId(cId);

			Set<Quiz> quizOpt = quizRepository.findByCategory(category);

			return quizOpt;
		} catch (Exception e) {
			throw new QuizException("Quiz not found !");
		}
	}

	@Override
	public Set<Quiz> getActiveQuizzes() throws QuizException {
		// TODO Auto-generated method stub
		try {
			return new HashSet<>(this.quizRepository.findByIsActive(true));
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@Override
	public Set<Quiz> getActiveQuizzesOfCategory(Integer cId) throws QuizException {
		// TODO Auto-generated method stub
		try {
			Category category = new Category();
			category.setCId(cId);

			Set<Quiz> quizOpt = quizRepository.findByCategoryAndIsActive(category, true);

			return quizOpt;
		} catch (Exception e) {
			throw new QuizException("Quiz not found !");
		}
	}

}
