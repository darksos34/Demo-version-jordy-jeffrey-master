package nl.prime.software.auth.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600) // Cross origin allowed for all ports
@RestController // Announce JPA controller
@RequestMapping("/api/test") // All mapping links start with /api/test
public class TestController {

	@GetMapping("/all") // No authentication required for access
	public String allAccess() {
		return "Public Content.";
	}

	@GetMapping("/user") // Allow access to /user when role = USER, MODERATOR and/or ADMIN
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod") // Allow access to /mod when role = MODERATOR
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin") // Allow access to /admin when role = ADMIN
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
