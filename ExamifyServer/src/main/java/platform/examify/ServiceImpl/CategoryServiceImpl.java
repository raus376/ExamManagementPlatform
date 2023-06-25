package platform.examify.ServiceImpl;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.examify.Exception.CategoryException;
import platform.examify.Repository.CategoryRepository;
import platform.examify.Service.CategoryService;
import platform.examify.model.Category;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category addCategory(Category category) throws CategoryException {
		// TODO Auto-generated method stub
		if (category == null) {
			throw new CategoryException("Category Details Required !");
		}

		try {
			return categoryRepository.save(category);
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}

	}

	@Override
	public Category updateCategory(Category category) throws CategoryException {
		// TODO Auto-generated method stub
		if (category == null) {
			throw new CategoryException("Category Details Required !");
		}

		try {
			return categoryRepository.save(category);
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}

	}

	@Override
	public Set<Category> getCategories() throws CategoryException {
		// TODO Auto-generated method stub
		try {
			return new LinkedHashSet<>(this.categoryRepository.findAll());
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}
	}

	@Override
	public Category getCategory(Integer categoryId) throws CategoryException {
		// TODO Auto-generated method stub
		try {
			Optional<Category> categoryOpt = this.categoryRepository.findById(categoryId);

			if (categoryOpt.isPresent()) {
				return categoryOpt.get();
			} else {
				throw new CategoryException("Category Not found !");
			}
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}
	}

	@Override
	public Category deleteCategory(Integer categoryId) throws CategoryException {
		// TODO Auto-generated method stub
		try {
			Optional<Category> categoryOpt = this.categoryRepository.findById(categoryId);

			if (categoryOpt.isPresent()) {
				this.categoryRepository.deleteById(categoryId);
				return categoryOpt.get();
			} else {
				throw new CategoryException("Category Not found !");
			}
		} catch (Exception e) {
			throw new CategoryException(e.getMessage());
		}
	}

}
