package platform.examify.Service;

import java.util.Set;

import platform.examify.Exception.CategoryException;
import platform.examify.model.Category;

public interface CategoryService {

	public Category addCategory(Category category) throws CategoryException;

	public Category updateCategory(Category category) throws CategoryException;

	public Set<Category> getCategories() throws CategoryException;

	public Category getCategory(Integer categoryId) throws CategoryException;
	
	public Category deleteCategory(Integer categoryId) throws CategoryException;
}
