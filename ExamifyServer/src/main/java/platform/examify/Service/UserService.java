package platform.examify.Service;

import java.util.Set;

import platform.examify.model.User;
import platform.examify.model.UserRole;

public interface UserService {

	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

	public User getUser(String userName) throws Exception;
	
	public User deleteUser(Integer userId) throws Exception;
}
