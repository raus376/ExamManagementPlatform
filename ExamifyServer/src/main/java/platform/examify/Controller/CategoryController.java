package platform.examify.Controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import platform.examify.Exception.CategoryException;
import platform.examify.Service.CategoryService;
import platform.examify.model.Category;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZATION')")
	@PostMapping("/create")
	public ResponseEntity<Category> addCategory(@RequestBody Category category) throws CategoryException {

		if (category == null) {
			throw new CategoryException("Category Details Required");
		}

		try {
			Category addCategory = categoryService.addCategory(category);

			return new ResponseEntity<>(addCategory, HttpStatus.CREATED);
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL') or hasRole('ORGANIZATION')")
	@GetMapping("/get/{categoryId}")
	public ResponseEntity<Category> getCategory(@PathVariable("categoryId") Integer categoryId)
			throws CategoryException {

		if (categoryId == null) {
			throw new CategoryException("Category Id Required !");
		}

		try {
			Category category = categoryService.getCategory(categoryId);

			return new ResponseEntity<>(category, HttpStatus.OK);
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}

	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL') or hasRole('ORGANIZATION')")
	@GetMapping("/getAll")
	public ResponseEntity<Set<Category>> getAllCategories() throws CategoryException {

		try {
			Set<Category> categories = categoryService.getCategories();

			return new ResponseEntity<>(categories, HttpStatus.OK);
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZATION')")
	@PutMapping("/update")
	public ResponseEntity<Category> updateCategory(@RequestBody Category category) throws CategoryException {

		try {
			Category updatedCategory = categoryService.updateCategory(category);

			return new ResponseEntity<>(updatedCategory, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{categoryId}")
	public ResponseEntity<Category> deleteCategory(@PathVariable("categoryId") Integer categoryId)
			throws CategoryException {

		if (categoryId == null) {
			throw new CategoryException("Category Id Required !");
		}

		try {
			Category category = categoryService.deleteCategory(categoryId);

			return new ResponseEntity<>(category, HttpStatus.OK);
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}

	}

}
