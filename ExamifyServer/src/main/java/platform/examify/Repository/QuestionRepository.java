package platform.examify.Repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import platform.examify.Exception.QuestionException;
import platform.examify.model.Question;
import platform.examify.model.Quiz;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

	public Set<Question> findByQuiz(Quiz quiz) throws QuestionException;
}
