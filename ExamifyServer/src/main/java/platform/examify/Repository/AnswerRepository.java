package platform.examify.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import platform.examify.model.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Integer>{

}
