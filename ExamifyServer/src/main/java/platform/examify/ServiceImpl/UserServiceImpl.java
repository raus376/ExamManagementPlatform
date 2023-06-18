package platform.examify.ServiceImpl;

import java.util.Optional;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.examify.Repository.RoleRepository;
import platform.examify.Repository.UserRepository;
import platform.examify.Service.UserService;
import platform.examify.model.User;
import platform.examify.model.UserRole;

@Service
public class UserServiceImpl implements UserService {
	private static final Logger logger = LogManager.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	// creating User
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		// TODO Auto-generated method stub
		Optional<User> isUserExist = userRepository.findByUserName(user.getUserName());
		User createdUser = new User();
		if (isUserExist.isPresent()) {
			logger.info("User already Exists");
			throw new Exception("User already present");
		} else {
			// saving All role inside our databases
			for (UserRole userRole : userRoles) {
				roleRepository.save(userRole.getRole());
			}

			user.getUserRoles().addAll(userRoles);
			createdUser = this.userRepository.save(user);

		}
		return createdUser;
	}

	@Override
	public User getUser(String userName) throws Exception {

		Optional<User> opt=userRepository.findByUserName(userName);
		
		if(!opt.isEmpty()) {
			return opt.get();
		}else {
			throw new Exception("User not found with userName: "+userName);
		}
	}

	@Override
	public User deleteUser(Integer userId) throws Exception {
		
	      Optional<User> optUser=userRepository.findById(userId);
	      
	      if(!optUser.isEmpty()) {
	    	  userRepository.deleteById(userId);
	    	  return optUser.get();
	      }else {
	    	  throw new Exception("User not present with userId: "+userId);
	      }
	}

}
