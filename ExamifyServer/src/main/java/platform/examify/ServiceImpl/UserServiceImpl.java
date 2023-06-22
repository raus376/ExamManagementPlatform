package platform.examify.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import platform.examify.Config.AppConstant;
import platform.examify.Exception.UserException;
import platform.examify.Repository.RoleRepository;
import platform.examify.Repository.UserRepository;
import platform.examify.Service.UserService;
import platform.examify.model.Role;
import platform.examify.model.User;

@Service
public class UserServiceImpl implements UserService {
	private static final Logger logger = LogManager.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;

	// register User
	@Override
	public User registerUser(User user) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	// creating User
	@Override
	public User createUser(User user) throws Exception {
		// TODO Auto-generated method stub
		Optional<User> isUserExist = userRepository.findByUniqueName(user.getUniqueName());
		User createdUser = new User();
		if (isUserExist.isPresent()) {
			logger.info("User already Exists");
			throw new Exception("User already present");
		} else {

			Role role = this.roleRepository.findById(AppConstant.ROLE_NORMAL).get();

			user.getRoles().add(role);
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			createdUser = this.userRepository.save(user);

		}
		return createdUser;
	}

	@Override
	public User getUser(String userName) throws UserException {

		Optional<User> opt = userRepository.findByUniqueName(userName);

		if (!opt.isEmpty()) {
			return opt.get();
		} else {
			throw new UserException("User not found with userName: " + userName);
		}
	}

	@Override
	public User deleteUser(Integer userId) throws UserException {

		Optional<User> optUser = userRepository.findById(userId);
		System.err.println("lksdjf");
		if (!optUser.isEmpty()) {
			userRepository.deleteById(userId);
			return optUser.get();
		} else {
			throw new UserException("User not present with userId: " + userId);
		}
	}

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

}
