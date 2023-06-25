package platform.examify.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import platform.examify.model.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Integer>{

}
