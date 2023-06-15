package platform.examify.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "roles")
public class Role {

	@Id
	private Integer roleId;
	private String role;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<UserRole> userRoles = new HashSet<>();

	public Role() {
		// TODO Auto-generated constructor stub
	}

	public Role(Integer roleId, String role, Set<UserRole> userRoles) {
		super();
		this.roleId = roleId;
		this.role = role;
		this.userRoles = userRoles;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Set<UserRole> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}

	@Override
	public String toString() {
		return "Role [roleId=" + roleId + ", role=" + role + ", userRoles=" + userRoles + "]";
	}

}
