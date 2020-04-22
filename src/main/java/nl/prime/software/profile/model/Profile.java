package nl.prime.software.profile.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.prime.software.audit.model.Audit;
import nl.prime.software.user.model.User;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "profile")
public class Profile extends Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;

    private String firstname;

    private String lastname;

    private String email;

    private String street;

    private String streetno;

    private String zip;

    private String city;

    private String avatar;

    //oneToOne Relationship with UserID
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private User user;


    public Profile(String username, String firstname, String lastname, String email, String street, String streetno, String zip, String city, User user) {
         this.username = username;
         this.firstname = firstname;
         this.lastname = lastname;
         this.email = email;
         this.street = street;
         this.streetno = streetno;
         this.zip = zip;
         this.city = city;
         this.user = user;
     }

    @Override
    public String toString() {
        return String.format("username: %s, avatar: %s", username, avatar);
    }

}
