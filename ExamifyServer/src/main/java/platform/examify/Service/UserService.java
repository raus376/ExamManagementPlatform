package platform.examify.Service;

import java.util.List;

import platform.examify.Exception.UserException;
import platform.examify.model.User;

public interface UserService {

	public User registerUser(User user) throws Exception;

	public User createUser(User user) throws Exception;

	public User getUser(String userName) throws UserException;
	
	public User getUserById(Integer uId) throws UserException;

	public User deleteUser(Integer userId) throws UserException;

	public User updateUser(User user,String role) throws UserException;

	public List<User> getAllUser();

}
