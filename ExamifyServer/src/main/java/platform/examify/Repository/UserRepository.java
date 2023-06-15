package platform.examify.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import platform.examify.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByUserName(String user);
}
