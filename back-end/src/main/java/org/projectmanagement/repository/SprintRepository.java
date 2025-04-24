package org.projectmanagement.repository;

import org.projectmanagement.model.entity.Sprint;
import org.springframework.data.repository.CrudRepository;

public interface SprintRepository  extends CrudRepository<Sprint, Integer> {
}
