package platform.examify.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
@Entity
@Table(name = "users")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@NotBlank @NotEmpty @Size(min = 3, max = 20,message = "UniqueName must contain at least 3 characters")
	private String uniqueName;
	
//	@Pattern(regexp = "[A-Za-z0-9@]{4,15}",message = "Password must be 6 to 15 characters and must have at least 1 alphabate and 1 number")
//	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=])(?!.*\\s).{6,15}$", message = "Password must be 6 to 15 characters and must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")
	@NotNull @NotBlank @NotEmpty
	private String password;
	
	@Email(message = "Invalid Email Address.")
	private String email;
	
	@NotBlank @NotEmpty @Size(min = 3, max = 20,message = "First Name must contain at least 3 characters")
	private String firstName;
	
	@NotBlank @NotEmpty @Size(min = 3, max = 20,message = "Last Name must contain at least 3 characters")
	private String lastName;
	
	@NotNull @Pattern(regexp = "[0-9]{10}",message = "Mobile number should be of 10 digits")
	private String mobile;
	
	private String profileImage;
	private Boolean isEnable = true;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role", referencedColumnName = "roleId"))
	private Set<Role> roles = new HashSet<>();

	public User() {
		// TODO Auto-generated constructor stub
	}

	public User(Integer id, String uniqueName, String password, String email, String firstName, String lastName,
			String mobile, String profileImage, Boolean isEnable, Set<Role> roles) {
		super();
		this.id = id;
		this.uniqueName = uniqueName;
		this.password = password;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobile = mobile;
		this.profileImage = profileImage;
		this.isEnable = isEnable;
		this.roles = roles;
	}

	public Integer getId() {
		return id;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Boolean getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(Boolean isEnable) {
		this.isEnable = isEnable;
	}

	public String getUniqueName() {
		return uniqueName;
	}

	public void setUniqueName(String uniqueName) {
		this.uniqueName = uniqueName;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		List<SimpleGrantedAuthority> authorities = this.roles.stream()
				.map((role) -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());

		return authorities;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return isEnable;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", uniqueName=" + uniqueName + ", password=" + password + ", email=" + email
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", mobile=" + mobile + ", profileImage="
				+ profileImage + ", isEnable=" + isEnable + ", roles=" + roles + "]";
	}

}
