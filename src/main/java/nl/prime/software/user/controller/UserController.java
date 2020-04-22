package nl.prime.software.user.controller;

import nl.prime.software.user.model.User;
import nl.prime.software.user.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000", maxAge = 3600)
@RestController // Instruct Spring Boot that this is the REST controller
@RequestMapping("/api/users") // Link to access GET/POST/PUT/DELETE requests
public class UserController {

    // Import Methods from other Class
    private final UserService userService; // Class from which methods are being imported

    // Make methods accessible via this constructor
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping // GET request handler
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}") // GET request handler by ID
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping // PUT request handler
    @PreAuthorize("hasRole('ADMIN')")
    public void updateUser(@Valid @RequestBody User user) {
        userService.updateUser(user);
    }

    @DeleteMapping("/{id}") // DELETE request handler by ID
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}
