package nl.prime.software.auth.controller;

import nl.prime.software.auth.payload.request.LoginRequest;
import nl.prime.software.auth.payload.request.SignupRequest;
import nl.prime.software.auth.payload.response.JwtResponse;
import nl.prime.software.auth.payload.response.MessageResponse;
import nl.prime.software.auth.security.jwt.JwtUtils;
import nl.prime.software.auth.security.services.UserDetailsImpl;
import nl.prime.software.role.model.ERole;
import nl.prime.software.role.model.Role;
import nl.prime.software.role.repository.RoleRepository;
import nl.prime.software.user.model.User;
import nl.prime.software.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600) // Cross origin allowed for all ports
@RestController // Announce JPA controller
@RequestMapping("/api/auth") // All mapping links start with /api/auth
public class AuthController {

	// Call class methods
	final AuthenticationManager authenticationManager;

	final UserRepository userRepository;

	final RoleRepository roleRepository;

	final PasswordEncoder encoder;

	final JwtUtils jwtUtils;

	public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.encoder = encoder;
		this.jwtUtils = jwtUtils;
	}

	@PostMapping("/signin") // Handle HTTP POST login request
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) { // Handle login

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())); // Authenticate username and password

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication); // Generate JWT token

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt,
												 userDetails.getId(),
												 userDetails.getUsername(),
												 userDetails.getEmail(),
												 roles));
	}

	@PostMapping("/signup") // Handle HTTP POST register request
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) { // Handle registration
		if (userRepository.existsByUsername(signUpRequest.getUsername())) { // Check if username already exists in the database
			return ResponseEntity
					.badRequest() // If username already exists
					.body(new MessageResponse("Error: Username is already taken!")); // Return message
		} // Else continue

		if (userRepository.existsByEmail(signUpRequest.getEmail())) { // Check if email address already exists in the database
			return ResponseEntity
					.badRequest() // If email address already exists
					.body(new MessageResponse("Error: Email is already in use!")); // Return message
		} // Else continue

		// Create new user's account
		User user = new User(signUpRequest.getUsername(),  // Get provided username
							 signUpRequest.getEmail(), // Get provided email address
							 encoder.encode(signUpRequest.getPassword())); // Get provided password

		Set<String> strRoles = signUpRequest.getRole(); // Set role
		Set<Role> roles = new HashSet<>(); // Assign role

		if (strRoles == null) { // When no role
			Role userRole = roleRepository.findByName(ERole.ROLE_USER) // Assign role USER
					.orElseThrow(() -> new RuntimeException("Error: Role is not found.")); // Else error
			roles.add(userRole); // Assign role
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles); // Set role
		userRepository.save(user); // Save user to database via repository method

		return ResponseEntity.ok(new MessageResponse("User registered successfully!")); // Return registered successfully message
	}

}
