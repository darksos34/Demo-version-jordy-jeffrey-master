package nl.prime.software.profile.repository;

import nl.prime.software.profile.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Profile findByUsername(String username);
    Profile findByEmail(String email);

}
