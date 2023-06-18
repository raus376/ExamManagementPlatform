package platform.examify.Controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import platform.examify.Service.UserService;
import platform.examify.model.Role;
import platform.examify.model.User;
import platform.examify.model.UserRole;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<User> createUser(@RequestBody User user) throws Exception {

		Role role = new Role();
		role.setRoleId(2);
		role.setRole("NORMAL");

		UserRole userRoleObject = new UserRole();
		userRoleObject.setRole(role);
		userRoleObject.setUser(user);
		Set<UserRole> userRole = new HashSet<>();

		userRole.add(userRoleObject);
		User createdUser = this.userService.createUser(user, userRole);
		return new ResponseEntity<>(createdUser, HttpStatus.ACCEPTED);

	}

	@GetMapping("/getUser/{userName}")
	public ResponseEntity<User> getUser(@PathVariable("userName") String userName) throws Exception {

		User findUser = this.userService.getUser(userName);

		return new ResponseEntity<>(findUser, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/deleteUser/{userId}")
	public ResponseEntity<User> deleteUser(@PathVariable("userId") Integer userId) throws Exception {

		User deletedUser = userService.deleteUser(userId);

		return new ResponseEntity<>(deletedUser, HttpStatus.ACCEPTED);
	}

}
