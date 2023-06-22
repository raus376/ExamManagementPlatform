package platform.examify.ServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import platform.examify.Repository.UserRepository;
import platform.examify.model.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		Optional<User> optUser = userRepository.findByEmail(email);

		if (optUser.isPresent()) {

			return optUser.get();
		} else {
			throw new UsernameNotFoundException("User not found with: " + email);
		}
	}

}
