package platform.examify;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import platform.examify.Config.AppConstant;
import platform.examify.Repository.RoleRepository;
import platform.examify.model.Role;

@SpringBootApplication
public class ExamifyApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(ExamifyApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		try {
			Role admin = new Role();
			admin.setRoleId(AppConstant.ROLE_ADMIN);
			admin.setRoleName("ROLE_ADMIN");
			
			Role organization = new Role();
			organization.setRoleId(AppConstant.ROLE_ORGANIZATION);
			organization.setRoleName("ROLE_ORGANIZATION");

			Role user = new Role();
			user.setRoleId(AppConstant.ROLE_NORMAL);
			user.setRoleName("ROLE_NORMAL");

			List<Role> roles = List.of(admin,organization, user);

			List<Role> savedRoles = this.roleRepository.saveAll(roles);

			savedRoles.forEach(item -> {
				System.out.println(item.getRoleName());
			});
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}

	}

}
