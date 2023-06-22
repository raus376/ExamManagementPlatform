package platform.examify.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import platform.examify.Service.UserService;
import platform.examify.model.User;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create")
	public ResponseEntity<User> createUser(@RequestBody User user) throws Exception {

		User createdUser = this.userService.createUser(user);
		return new ResponseEntity<>(createdUser, HttpStatus.ACCEPTED);
 
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getUser/{userName}")
	public ResponseEntity<User> getUser(@PathVariable("userName") String userName) throws Exception {

		User findUser = this.userService.getUser(userName);

		return new ResponseEntity<>(findUser, HttpStatus.ACCEPTED);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteUser/{userId}")
	public ResponseEntity<User> deleteUser(@PathVariable("userId") Integer userId) throws Exception {

		User deletedUser = userService.deleteUser(userId);

		return new ResponseEntity<>(deletedUser, HttpStatus.ACCEPTED);
	}

}
