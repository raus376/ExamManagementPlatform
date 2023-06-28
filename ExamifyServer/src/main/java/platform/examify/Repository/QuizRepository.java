package platform.examify.Repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import platform.examify.model.Category;
import platform.examify.model.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

	public Set<Quiz> findByCategory(Category category);

	public Set<Quiz> findByIsActive(Boolean isActive);

	public Set<Quiz> findByCategoryAndIsActive(Category category, Boolean isActive);
}
