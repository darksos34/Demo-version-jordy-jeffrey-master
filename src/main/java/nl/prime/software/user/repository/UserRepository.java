package nl.prime.software.user.repository;

import nl.prime.software.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username); // Lookup provided username in the database

    Boolean existsByUsername(String username); // Check username existence in the database

    Boolean existsByEmail(String email); // Check email address existence in the database

}
