package platform.examify.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "quiz")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Quiz {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer qId;

	private String title;

	private String description;

	private Integer maxMarks;

	private Integer numberOfQuestions;

	private Boolean isActive = false;

	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;

	@JsonIgnore
	@OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Question> questions = new HashSet<>();

}
