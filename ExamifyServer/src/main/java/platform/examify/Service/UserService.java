package platform.examify.Service;

import java.util.Set;

import platform.examify.model.User;
import platform.examify.model.UserRole;

public interface UserService {

	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

}
