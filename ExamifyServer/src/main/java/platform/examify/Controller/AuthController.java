package platform.examify.Controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import platform.examify.Security.JwtHelper;
import platform.examify.Service.UserService;
import platform.examify.model.JwtRequest;
import platform.examify.model.JwtResponse;
import platform.examify.model.User;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtHelper helper;

	@Autowired
	private UserService userService;

	private Logger logger = LoggerFactory.getLogger(AuthController.class);

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

		this.doAuthenticate(request.getEmail(), request.getPassword());

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		String token = this.helper.generateToken(userDetails);

		JwtResponse response = JwtResponse.builder().token(token).userName(userDetails.getUsername()).build();
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<User> createUser(@RequestBody User user) throws Exception {

		User createdUser = this.userService.createUser(user);
		return new ResponseEntity<>(createdUser, HttpStatus.ACCEPTED);

	}
	
	@PostMapping("/role/register/{role}")
	public ResponseEntity<User> createUserRoleBased(@RequestBody User user,@PathVariable("role") String role) throws Exception {

		User createdUser = this.userService.createUserRoleBased(user,role);
		return new ResponseEntity<>(createdUser, HttpStatus.ACCEPTED);

	}

	private void doAuthenticate(String email, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		try {
			manager.authenticate(authentication);

		} catch (BadCredentialsException e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}

	}

	@ExceptionHandler(BadCredentialsException.class)
	public String exceptionHandler() {
		return "Credentials Invalid !!";
	}

	@GetMapping("/currentUser")
	public String getLoggedInUser(Principal principle) {

		return principle.getName();
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL') or hasRole('ORGANIZATION')")
	@GetMapping("/current-user")
	public User currentUser(Principal princple) {
		return (User) this.userDetailsService.loadUserByUsername(princple.getName());
	}
	
	@GetMapping("/test")
	public String test() {
		return "test";
	}

}
