package nl.prime.software.role.repository;

import nl.prime.software.role.model.ERole;
import nl.prime.software.role.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // Announce JPA repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(ERole name); // Lookup provided role in the database

}
