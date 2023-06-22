package platform.examify.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import platform.examify.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	public Optional<User> findByUniqueName(String uniqueName);

	public Optional<User> findById(Integer userId);

	public Optional<User> findByEmail(String email);

}
