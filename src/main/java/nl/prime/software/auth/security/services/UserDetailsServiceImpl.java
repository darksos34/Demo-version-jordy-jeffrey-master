package nl.prime.software.auth.security.services;

import nl.prime.software.user.model.User;
import nl.prime.software.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service // Announce JPA service
public class UserDetailsServiceImpl implements UserDetailsService {

	public final UserRepository userRepository; // Call UserRepository method(s)

	// Make methods accessible via this constructor
	public UserDetailsServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override // Override functions/methods
	@Transactional // Execute transaction methods without stating them
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { // Call function loadUserByUsername
		User user = userRepository.findByUsername(username) // Execute method findByUsername from the UserRepository.java
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username)); // User not found exception handling

		return UserDetailsImpl.build(user); // Return user
	}

}
