package platform.examify.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import platform.examify.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer>{

}
